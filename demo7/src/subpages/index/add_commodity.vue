<template>
  <div class="addcommodity">
      <!-- 头部面包屑组件 -->
       <addcommodity-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>添加数据</el-breadcrumb-item>
             <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </template>
       </addcommodity-bread>
       <div class="formtable">
         <div class="menu">
           <el-row>
             <el-col :span="24" class="title">选择食品种类</el-col>
           </el-row>

           <el-row>
             <el-col :span="24" class="list">
               <el-form ref="food" :model="foodtype" label-width="100px">

                  <el-form-item label="食品种类">
                    <el-select v-model="foodtype.name" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>                         
                  </el-form-item>  
                  <el-form-item label="食品分类">
                      <el-input v-model="foodtype.assort"></el-input>                        
                  </el-form-item>

                  <el-form-item label="种类描述">
                     <el-input v-model="foodtype.depict"></el-input>                         
                  </el-form-item> 

                  <el-form-item >
                    <el-button type="primary">提交</el-button>                       
                  </el-form-item> 
              </el-form>
             </el-col>
           </el-row>
          </div>
          <div class="addtable">
          <el-row>
                <el-col :span="24" class="form_title">
                     添加商品
                </el-col>
           </el-row>
           <el-row>
                <el-col :span="24" class="form_list">
                    <el-form ref="food" :model="foodtype" label-width="100px">
                        <el-form-item label="食品种类">
                           <el-input v-model="foodtype.assort"></el-input>     
                        </el-form-item>  

                        <el-form-item label="食品分类">
                            <el-input v-model="foodtype.assort"></el-input>                        
                        </el-form-item>

                        <el-form-item label="种类描述">
                          <el-input v-model="foodtype.depict"></el-input>                         
                        </el-form-item> 


                        <el-form-item label="上传食品图片">
                          <el-upload
                            class="avatar-uploader"
                            :show-file-list="false"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </el-form-item>

                        <el-form-item label="食品特点">
                           <el-select v-model="foodtype.food_feature" placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>                               
                        </el-form-item>
                         
                        <el-form-item label="食品规格">
                            <el-row :inline="true">
                               <el-col :span="4">
                                     <el-radio v-model="foodtype.single" label="单规格"></el-radio>                                           
                               </el-col>
                               <el-col :span="4">                              
                                     <el-radio v-model="foodtype.many" label="多规格"></el-radio>                                              
                               </el-col>
                            </el-row>                        
                        </el-form-item> 

                        <el-form-item>
                              <el-button type="primary">添加规格</el-button>                   
                        </el-form-item>

                         <el-form-item>
                            <!-- 优惠活动表格 -->
                              <el-table
                                size="mini"
                                :data="foodtype.tableData"
                                style="width:90%;border:1px solid #ccc">

                                <el-table-column
                                  align='center'
                                  prop="doing_title"
                                  label="活动标题"
                                  width="100">
                                </el-table-column>

                                <el-table-column
                                  prop="doing_name"
                                  align='center'
                                  label="活动名称"
                                  width="150">
                                </el-table-column>

                                <el-table-column
                                  prop="doing_item"
                                  align='center'
                                  label="活动详情"
                                  width="150">
                                </el-table-column>

                                <el-table-column 
                                  label="操作"
                                  align="center"
                                  width="113"
                                >
                                  <template slot-scope="scope">
                                    <el-button
                                      size="mini"
                                      type="danger"
                                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                  </template>
                                </el-table-column>
                              </el-table>
                      </el-form-item>
                        <el-form-item>
                              <el-button type="primary">确认添加商品</el-button>                   
                        </el-form-item>
                    </el-form>
                </el-col>
           </el-row>
           </div>
       </div>
  </div>
</template>

<script>
import AddcommodityBread from '../../components/common/Bread'
export default {
  name: 'addcommodity',
  components:{
      AddcommodityBread,
  },
  data () {
        return{
          show2:false,
          foodtype:{
            name:'',
            assort:'',
            depict:'',
            feature:'',
            single:'',
            many:'',
            tableData:[{doing_title:'减',doing_name:'满减优惠',doing_item:'满30减5，满60减8'}]
          },
           options: [{
          value: '选项1',
          label: '黄金糕'
        }]
      }
  },
   methods:{
        //     // 上传头像函数
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    //    上传头像限制尺寸函数
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
      }
 
}
</script>

<style lang="stylus" scoped>
.addcommodity >>>.el-table th, .el-table tr {
  background-color:rgb(238,241,246);
  font-size:14px;
  color:#000
  font-weight:bold;
}
.addcommodity >>>.avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .avatar{
          width: 150px;
          height: 150px;
          display: block;
       }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 150px;
          height: 150px;
          line-height: 178px;
          text-align: center;
        }
}
  .formtable{
    width:60%;
    height:100%;
    margin:0 auto;
    .menu{
       width:100%;
       height:auto;
       margin-top:30px; 
       .title{
        text-align:center;
        font-size:16px;
        margin-bottom:5px;
      }
       .list{
         padding:20px 20px 0 20px;
         margin-top:5px;
         border:1px solid #eee;
         border-radius:3px;
         .el-select{
           width:100%;
         }
       }
    }
    .addtable{
      width:100%;
      height:auto;
      margin:50px 0;
      .form_title{
        font-size:16px;
        text-align:center;
        margin-bottom:10px;
      }
      .form_list{
        padding:20px 20px 0 20px;
        margin-top:5px;
        border:1px solid #eee;
        border-radius:3px;
        box-shadow: 0 0 3px #ccc;
      }
    }
   }
</style>