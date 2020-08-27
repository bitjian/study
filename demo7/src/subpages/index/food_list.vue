<template>
  <div class="foodlist">
      <!-- 头部面包屑组件 -->
       <food-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>数据管理</el-breadcrumb-item>
             <el-breadcrumb-item>食品列表</el-breadcrumb-item>
        </template>
       </food-bread>
       <div class="foodtable">
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

                    <el-form-item label="食品名称:">
                      <span :title="props.row.name">{{ props.row.name }}</span>
                    </el-form-item>

                    <el-form-item label="餐馆名称:">
                      <span :title="props.row.pinyin_name">{{ props.row.pinyin_name }}</span>
                    </el-form-item>

                    <el-form-item label="食品ID:">
                      <span :title="props.row.category_id">{{ props.row.category_id }}</span>
                    </el-form-item>

                    <el-form-item label="餐馆ID:">
                      <span :title="props.row.restaurant_id">{{ props.row.restaurant_id }}</span>
                    </el-form-item>

                    <el-form-item label="食品介绍:" >
                      <span :title="props.row.satisfy_count">{{ props.row.satisfy_count }}</span>
                    </el-form-item>

                    <el-form-item label="餐馆时间:">
                      <span :title="props.row.server_utc">{{ props.row.server_utc}}</span> 
                    </el-form-item>

                    <el-form-item label="食品评分:">
                      <span :title="props.row.rating">{{ props.row.rating }}</span>
                    </el-form-item>

                    <el-form-item label="食品分类:">
                      <span :title="props.row.satisfy_rate">{{ props.row.satisfy_rate }}</span>  
                    </el-form-item>

                     <el-form-item label="月销量:">
                      <span :title="props.row.month_sales">{{ props.row.month_sales }}</span>
                    </el-form-item>
                  </el-form>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="食品名称"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="description"
              label="食品介绍"
              align="center"
              :show-overflow-tooltip="true"
              width="300">
            </el-table-column>

            <el-table-column
              prop="rating"
              align="center"
              :show-overflow-tooltip="true"
              label="评分">
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
                  :page-sizes="pagination.pagesizes"
                  :page-size="pagination.pageSize"
                  :layout="pagination.pagelayout"
                  :total="pagination.pagetotal">
                </el-pagination>
            </el-col>
          </el-row>
       </div>
       <div class="dialogInfo">
            <food-dialog :dialog="dialog" :foodInfo = "foodInfo"></food-dialog>
       </div>
  </div>
</template>

<script>
import FoodDialog from '../../components/food_list/Dialog'
import FoodBread from '../../components/common/Bread'
export default {
  name: 'foodlist',
  components:{
      FoodBread,
      FoodDialog
  },
  data () {
      return{
          pagination:{
             page_index:1,
             pageSize:20,
             pagesizes:[5,10,15,20],
             pagetotal:0,
             pagelayout:'total,sizes,prev,pager,next,jumper'
          },
          foodInfo:{
            name:'',
            description:'',
            satisfy_count:'',
            image_path:'',
            item_id:'',
            specfoods:'',
            category_id:'',
            restaurant_id:''
         },
          tableData: [],
          tableDataArr:[],
          dialog:{
            show:false,
            title:'修改食品列表'
          }
    }
  },
  methods:{
    async getFoodInfo () {
        let res = await this.$axios.getfoodlist()
        this.tableDataArr = res.data
        this.getpagination()
    },
    //分页函数
    getpagination() {
        this.pagination.page_index = 1;
        this.pagination.pagetotal = this.tableDataArr.length;
        this.tableData = this.tableDataArr.filter((item,index)=>{
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
         for (let i = index; i < num; i++) {
             if (this.tableDataArr[i]){
               lable.push(this.tableDataArr[i])
             }
         }
         this.tableData = lable;
    },
    //编辑
    handleEdit (index,row) {
      this.dialog.show = true;
      this.foodInfo = {
         name:row.name,
         description:row.description,
         satisfy_count:row.satisfy_count,
         image_path:row.image_path,
         category_id:row.category_id,
         restaurant_id:row.restaurant_id,
         specfoods:row.specfoods,
         item_id:row.item_id
      }
    },
    //删除
    handleDelete (index,row) {
        console.log(index,row)
    }
  },
  mounted () {
    this.getFoodInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .foodlist  >>> .el-table th
    background-color:#eee;
  .foodlist >>> .el-table__expanded-cell[class*=cell]
    padding:0;
  .foodlist >>> .el-form-item__label
    width:90px;
    color:#000;
  .foodlist >>> .el-form-item__content
    font-size:10px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  .foodtable >>> .el-table thead
    font-size:14px;
    color:#000;
    font-weight:bold;
   .foodtable
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