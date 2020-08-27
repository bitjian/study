<template>
  <div class="home">
      <!-- 头部面包屑组件 -->
     <home-bread></home-bread>
     <div class="container">
        <div class="data">
          <div class="title">数据统计</div>
          <el-row :inline='true'>
              <el-col :span="3" class="dayData">当日数据：</el-col>
              <el-col :span="3">87<span class="info">新增用户</span></el-col>
              <el-col :span="3">18<span class="info">新增订单</span></el-col>
              <el-col :span="3">59<span class="info">新增管理员</span></el-col>
          </el-row>
          <el-row :inline='true'>
              <el-col :span="3" class="dayData">总数据：</el-col>
              <el-col :span="3">39764<span class="info">注册用户</span></el-col>
              <el-col :span="3">12689<span class="info">订单</span></el-col>
              <el-col :span="3">55937<span class="info">管理员</span></el-col>
          </el-row>
     </div>
      <div class="trend">
           <div ref="mian1"  style="width:100%;height:100%;"></div>
      </div>
     </div>
  </div>
</template>

<script>
import HomeBread from '../../components/common/Bread'
export default {
  name: 'home',
  components:{
      HomeBread
  },
  methods:{
      trendInfo () {
          const myechart = this.$echarts.init(this.$refs.mian1)
          myechart.setOption({
                      title: {
                    text: '走势图',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['新注册用户','新增订单','新增管理员']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap:false,
                    data: ['2019-10-27','2019-10-28','2019-10-29','2019-10-30','2019-10-31','2019-11-01','2019-11-02']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'新注册用户',
                        type:'line',
                        data:[7, 208, 251, 235, 163, 87, 89],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'新增订单',
                        type:'line',
                        data:[7, 27, 34, 30, 67, 18, 52],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'新增管理员',
                        type:'line',
                        data:[43, 126, 120, 109, 72, 59, 33],
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    }
                ]
          })
      }
  },
  mounted () {
     this.trendInfo()
  }
}
</script>

<style lang="stylus" scoped>
 .container
   width:100%;
   padding:20px;
  .title
   font-size:20px;
   text-align:center;
   width:100%;
   line-height:30px;
   margin-bottom:20px;
  .el-col
    background-color:#EBEEF5;
    margin:5px 10px;
    line-height:35px;
    border-radius:5px;
    text-align:center;
    overflow:hidden;
    .info 
      font-size:12px;
      color:#ccc;
      margin-left:5px;
  .dayData 
    background-color:#409EFF;
   .trend 
     width:80%;
     height:450px;
     margin: 50px auto;
</style>