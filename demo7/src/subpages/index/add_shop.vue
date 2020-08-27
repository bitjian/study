<template>
  <div class="addshop">
      <!-- 头部面包屑组件 -->
       <addshop-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>添加数据</el-breadcrumb-item>
             <el-breadcrumb-item>添加商铺</el-breadcrumb-item>
        </template>
       </addshop-bread>
       <div class="formtable">
        <el-form :model="shopData" :rules="rules" ref="ruleForm" label-width="100px">
            <!-- 店铺名称 -->
            <el-form-item label="店铺名称" prop="name">
            <el-input v-model="shopData.name"></el-input>
            </el-form-item>
             <!-- 详细地址名称 -->
            <el-form-item label="详细地址" prop="address">
            <!-- <el-input v-model="shopData.address"></el-input> -->
            <el-autocomplete
              v-model="shopData.address"
              style="width:100%"
              placeholder="请输入内容"      
            ></el-autocomplete>
            
            <div class="city">当前城市：{{city.name }}</div>
            </el-form-item>

            <!-- 联系电话 -->
            <el-form-item label="联系电话" prop="phone">
            <el-input v-model="shopData.phone"></el-input>
            </el-form-item>
            <!-- 店铺简介 -->
            <el-form-item label="店铺简介" prop="summary">
            <el-input v-model="shopData.summary"></el-input>
            </el-form-item>
            <!-- 店铺标语 -->
            <el-form-item label="店铺标语" prop="slogan">
            <el-input v-model="shopData.slogan"></el-input>
            </el-form-item>
             <!-- 店铺分类 -->
            <el-form-item label="店铺分类" prop="classify">
              <el-cascader :options="options" clearable v-model="shopData.classify"></el-cascader>
            </el-form-item> 
              <!-- 店铺特点 -->
            <el-form-item label="店铺特点">
               <el-row :inline="true">
                   <!-- 店铺特点 -->
                   <el-col :span="8">
                     <el-form-item label="品牌保证" prop="brand">
                      <el-switch v-model="shopData.brand"></el-switch>
                    </el-form-item>
                   </el-col>
                   <el-col :span="8">
                    <el-form-item label="蜂鸟专送" prop="hummer">
                      <el-switch v-model="shopData.hummer"></el-switch>
                    </el-form-item>
                   </el-col>
                   <el-col :span="8">
                    <el-form-item label="新开店铺" prop="opened">
                      <el-switch v-model="shopData.opened"></el-switch>
                    </el-form-item>
                   </el-col>
              </el-row>          
            </el-form-item>
             <!-- 配送费用 -->
             <el-form-item label="配送费" prop="Deliveryprice">
                 <el-input-number size="small" v-model="shopData.Deliveryprice"></el-input-number>  
             </el-form-item>

             <!-- 起送价钱 -->
             <el-form-item label="起送价" prop="Startingprice">
                  <el-input-number size="small" v-model="shopData.Startingprice"></el-input-number>   
             </el-form-item>
             <!-- 营业时间 -->
             <el-form-item label="营业时间">
                  <el-time-select
                    placeholder="起始时间"
                    v-model="shopData.startTime"
                    size='small'
                    :editable="false"
                 >
                </el-time-select>
                <el-time-select
                    placeholder="结束时间"
                    v-model="shopData.endTime"
                    size='small'
                    :editable="false"
                    >
                </el-time-select>  
             </el-form-item>
             <!-- 上传店铺头像 -->
            <el-form-item label="上传店铺头像">
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

            <!-- 上传营业执照 -->
            <el-form-item label="上传营业执照">
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

            <!-- 上传餐饮许可证-->
            <el-form-item  label="餐饮许可证">
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
               <!-- 优惠活动 -->
             <el-form-item  label="优惠活动">
               <el-select v-model="shopData.value" placeholder="请选择">
                    <el-option
                    v-for="item in coupon"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
             </el-select>
            </el-form-item>
            <!-- 优惠活动表格 -->
                <el-table
                  size="mini"
                  :data="shopData.tableData"
                  style="width:92%;margin-bottom:30px;border:1px solid #ccc">

                  <el-table-column
                    align='center'
                    prop="doing_title"
                    label="活动标题"
                    width="120">
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
                    width="126"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

            <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
       </div>
  </div>
</template>

<script>
import AddshopBread from '../../components/common/Bread'
import { mapState } from 'vuex'
export default {
  name: 'addshop',
  components:{
      AddshopBread
  },
  computed:{
       ...mapState(['city'])
      },
   data() {
      return {
        // 上传头像
        imageUrl:'',
        // //   活动优惠卷
        // tableData:[
        //   {doing_title:'减',doing_name:'满减优惠',doing_item:'满30减5，满60减8'}
        // ]
      coupon: [
          {value: '选项1',label: '黄金糕'},
          {value: '选项2',label: '双皮奶'}
        ],
        // 店铺分类
        options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
            value: 'shejiyuanze',
            label: '设计原则',
        }]
        }],
        //表单初始化数据
        shopData: {
          name: '',
          address:'',
          phone:'',
          summary:'',
          slogan:'',
          classify:'',
          brand:false,
          hummer:false,
          opened:false,
          Deliveryprice:'',
          Startingprice:'',
          startTime:'',
          endTime:'',
          value:'',
          tableData:[{doing_title:'减',doing_name:'满减优惠',doing_item:'满30减5，满60减8'}]
        },
        // 表单验证
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 表格删除
      handleDelete(index,row) {
           console.log(index,row)
      },
        // 立即创建按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //   重置按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
.addshop >>>.el-table th, .el-table tr {
  background-color:rgb(238,241,246);
  font-size:14px;
  color:#000
  font-weight:bold;
}
.addshop >>>.avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .avatar{
          width: 178px;
          height: 178px;
          display: block;
       }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
}
  .formtable{
     width:50%;
     height:100%;
     padding:20px;
     margin:0 auto;
}
</style>