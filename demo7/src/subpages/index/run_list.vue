<template>
  <div class="runlist">
      <!-- 头部面包屑组件 -->
       <run-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>数据管理</el-breadcrumb-item>
             <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
        </template>
       </run-bread>
       <div class="runtable">
           <el-table
            :data="tableData"
            size="mini"
            max-height="614px"
            style="width: 100%;border:1px solid #eee;"
            >

            <el-table-column
              prop="date"
              label="序号"
              align="center"
              width="50">
              <template slot-scope="scope">
                   {{ scope.$index+1 }}
              </template>
            </el-table-column>

            <el-table-column
              prop="user_name"
              label="用户名称"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="create_time"
              label="注册日期"
              align="center"
              width="180">
            </el-table-column>
            
            <el-table-column
              prop="city"
              label="地址"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="admin"
              label="权限"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="id"
              align="center"
              label="管理员ID">
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
                  :page-sizes="pagination.page_sizes"
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
import RunBread from '../../components/common/Bread'
export default {
  name: 'runlist',
  components:{
      RunBread
  },
   data() {
        return {
          pagination:{
            page_index:1,
            pageSize:20,
            page_sizes:[5,10,15,20],
            pagelayout:'total,sizes,prev,pager,next,jumper',
            pagetotal:0
          },
          tableData: [],
          tableDataAll:[]
        }
      },
    methods:{
    //获取管理员数据
    async getAdminInfo () {
         let res = await this.$axios.getAdmin()
         this.tableDataAll = res.data.data;
         this.mypagination ()
    },
    //初始化分页
    mypagination () {
       this.pagination.page_index = 1;
       this.pagination.pageSize = 20;
       this.pagination.pagetotal = this.tableDataAll.length;
       this.tableData = this.tableDataAll.filter((item,index)=>{
            return index < this.pagination.pageSize
       })
    },
    //每一页显示多少条
    handleSizeChange(pagesize) {
        this.pagination.page_index = 1;
        this.pagination.pageSize = pagesize;
        this.tableData = this.tableDataAll.filter((item,index)=>{
             return index < pagesize
        })
    },
    //当前第几页
    handleCurrentChange (page) {
      const index = this.pagination.pageSize * (page-1);
      const num = this.pagination.pageSize * page;
      const table = [];
      for (let i = index; i < num; i ++){
        if (this.tableDataAll[i]) {
           table.push(this.tableDataAll[i])
        }
      }
      this.tableData = table;
    }
  },
  mounted () {
     this.getAdminInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .runlist  >>> .el-table th
    background-color:#eee;
  .runtable >>> .el-table thead
    font-size:14px;
    color:#000;
    font-weight:bold;
   .runtable
     padding:20px;
     height:100%;
    .pagination 
     text-align:right;
     margin-top:10px;
</style>