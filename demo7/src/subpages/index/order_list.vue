<template>
  <div class="orderlist">
      <!-- 头部面包屑组件 -->
       <order-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>数据管理</el-breadcrumb-item>
             <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </template>
       </order-bread>
       <div class="ordertable">
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
                      <span :title="props.row.restaurant_name">{{ props.row.restaurant_name }}</span>
                    </el-form-item>

                    <el-form-item label="店铺日期:">
                      <span :title="props.row.formatted_created_at">{{ props.row.formatted_created_at }}</span>
                    </el-form-item>

                    <el-form-item label="联系电话:">
                      <span :title="props.row.order_time">{{ props.row.order_time }}</span>
                    </el-form-item>

                    <el-form-item label="销售量:">
                      <span :title="props.row.time_pass">{{ props.row.time_pass }}</span>
                    </el-form-item>

                    <el-form-item label="店铺地址:" >
                      <span :title="props.row.category">{{ props.row.category }}</span>
                    </el-form-item>

                    <el-form-item label="店铺ID:">
                      <span :title="props.row.unique_id">{{ props.row.unique_id }}</span>
                    </el-form-item>

                    <el-form-item label="评分:">
                      <span :title="props.row.operation_rebuy">{{ props.row.operation_rebuy }}</span>
                    </el-form-item>

                    <el-form-item label="分类:">
                      <span :title="props.row.is_deletable">{{ props.row.is_deletable }}</span>
                    </el-form-item>
                  </el-form>
              </template>
            </el-table-column>

            <el-table-column
              prop="restaurant_name"
              label="用户名称"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="operation_rebuy"
              label="订单状态"
              align="center"
              :show-overflow-tooltip="true"
              width="300">
            </el-table-column>

            <el-table-column
              prop="total_amount"
              align="center"
              :show-overflow-tooltip="true"
              label="总价格">
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
  </div>
</template>

<script>
import OrderBread from '../../components/common/Bread'
export default {
  name: 'orderlist',
  components:{
      OrderBread
  },
  data () {
      return{
         pagination:{
            page_index:1,
            pageSize:20,
            page_sizes:[5, 10, 15, 20],
            pagelayout:'total,sizes,prev,pager,next,jumper',
            pagetotal:0
         },
          tableData: [],
          tableDataArr:[]
    }
  },
  methods:{
    //获取订单列表
    async getOrderData () {
       let res = await this.$axios.getOrderList()
        this.tableDataArr = res.data
        this.ispagination()
    },
    //实现分页初始化
    ispagination () {
        this.pagination.page_index = 1;
        this.pagination.pageSize = 20;
        this.pagination.pagetotal = this.tableDataArr.length
        this.tableData = this.tableDataArr.filter((item,index) => {
             return index < this.pagination.pageSize
        })
    },
    //每一页显示多少条
    handleSizeChange(pagesize) {
        this.pagination.page_index = 1;
        this.pagination.pageSize = pagesize;
        this.tableData = this.tableDataArr.filter((item,index)=>{
            return index < pagesize
        })
    },
    //当前第几页
    handleCurrentChange (page) {
         const index = this.pagination.pageSize * (page-1);
         const num = this.pagination.pageSize * page;
         const lable = [];
         for(let i = index; i < num; i++) {
             if (this.tableDataArr[i]){
               lable.push(this.tableDataArr[i])
             }
         }
         this.tableData = lable
    },
    //编辑
    handleEdit (index,row) {
       console.log(index,row)
    },
    //删除
    handleDelete (index,row) {
        console.log(index,row)
    }
  },
  mounted () {
    this.getOrderData()
  }
}
</script>

<style lang="stylus" scoped>
  .orderlist >>> .el-table th
    background-color:#eee;
  .orderlist >>> .el-table__expanded-cell[class*=cell]
    padding:0;
  .orderlist >>> .el-form-item__label
    width:90px;
    color:#000;
  .orderlist >>> .el-form-item__content
    font-size:10px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  .ordertable >>> .el-table thead
    font-size:14px;
    color:#000;
    font-weight:bold;
   .ordertable
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
        padding:0 10px;
        display:inline-block;
        overflow:hidden;
    .pagination 
     text-align:right;
     margin-top:10px;
</style>