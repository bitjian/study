<template>
  <div class="businesslist">
      <!-- 头部面包屑组件 -->
       <business-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>数据管理</el-breadcrumb-item>
             <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        </template>
       </business-bread>
       <div class="businesstable">
           <el-table
            :data="tableData"
            size="mini"
            max-height="614px"
            style="width: 100%;border:1px solid #eee;"
            stripe
            highlight-current-row
            >
            <el-table-column
               type="expand"
               label="详情"
              >
              <template slot-scope="props">
                  <el-form   class="demo-table-expand">

                    <el-form-item label="店铺名称:">
                      <span :title="props.row.name">{{ props.row.name }}</span>
                    </el-form-item>

                    <el-form-item label="店铺介绍:">
                      <span :title="props.row.promotion_info">{{ props.row.promotion_info }}</span>
                    </el-form-item>

                    <el-form-item label="联系电话:">
                      <span :title="props.row.phone">{{ props.row.phone }}</span>
                    </el-form-item>

                    <el-form-item label="销售量:">
                      <span :title="props.row.rating_count">{{ props.row.rating_count }}</span>
                    </el-form-item>

                    <el-form-item label="店铺地址:" >
                      <span :title="props.row.address">{{ props.row.address }}</span>
                    </el-form-item>

                    <el-form-item label="店铺ID:">
                      <span :title="props.row.id">{{ props.row.id }}</span>
                    </el-form-item>

                    <el-form-item label="评分:">
                      <span :title="props.row.rating">{{ props.row.rating }}</span>
                    </el-form-item>

                    <el-form-item label="分类:">
                      <span :title="props.row.category">{{ props.row.category}}</span>
                    </el-form-item>
                  </el-form>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="店铺名称"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="address"
              label="店铺地址"
              align="center"
              :show-overflow-tooltip="true"
              width="300">
            </el-table-column>

            <el-table-column
              prop="promotion_info"
              align="center"
              :show-overflow-tooltip="true"
              label="店铺介绍">
            </el-table-column>
            
             <el-table-column
              label="操作"
              align="center"
              width="300"
             >
              <template slot-scope="scope">

                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>

                <el-button
                  size="mini"
                  type="success"
                  @click="handleAdd(scope.$index, scope.row)"
                  >添加食品</el-button>

                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>

              </template>
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
       <business-dialog :dialog="dialog"></business-dialog>
  </div>
</template>

<script>
import BusinessBread from '../../components/common/Bread'
import BusinessDialog from '../../components/business_list/editDialog'
export default {
  name: 'businesslist',
  components:{
      BusinessBread,
      BusinessDialog
  },
  data () {
      return{
          dialog:{
            show:false,
            title:''
          },
          pagination:{
             page_index:0,
             pageSize:0,
             page_sizes:[5,10,15,20],
             pagelayout:"total,sizes,prev,pager,next,jumper",
             pagetotal:0
          },
          tableData: [],
          tableDataAll:[]
    }
  },
   methods:{
     //获取商家信息数据
   async getBusiness() {
        let res = await this.$axios.merchantList()
          this.tableDataAll = res.data;
          this.getpagination()
    },
    //分页
    getpagination() {
       this.pagination.page_index = 1;
       this.pagination.pageSize = 10;
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
         for (let i = index; i < num; i++) {
               if (this.tableDataAll[i]) {
                     table.push(this.tableDataAll[i])
               }
         }
         this.tableData = table
    },
    //编辑
    handleEdit (index,row) {
       this.dialog={
          show:true,
          title:'修改店铺信息'
       }
    },
    //添加商品
    handleAdd (index,row) {
       this.$router.push('/addcommodity');
    },
    //删除
    handleDelete (index,row) {
        console.log(index,row)
    }
  },
  mounted () {
      this.getBusiness()
  }
}
</script>

<style lang="stylus" scoped>
  .businesslist  >>> .el-table th
    background-color:#eee;
  .businesslist >>> .el-table__expanded-cell[class*=cell]
    padding:0;
  .businesslist >>> .el-form-item__label
    width:90px;
    color:#000;
  .businesslist >>> .el-form-item__content
    font-size:10px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  .businesstable >>> .el-table thead
    font-size:14px;
    color:#000;
    font-weight:bold;
   .businesstable
     padding:20px;
     height:100%;
     .demo-table-expand
       font-size:0;
       background-color:#F2F6FC;
       .el-form-item
        min-width:0
        margin-right: 0;
        margin-bottom: 0;
        width:50%;
        overflow:hidden;
        padding:0 10px;
        display:inline-block;
    .pagination 
     text-align:right;
     margin-top:10px;
</style>