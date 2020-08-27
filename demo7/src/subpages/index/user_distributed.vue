<template>
  <div class="userdistributed">
      <!-- 头部面包屑组件 -->
       <userdistributed-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>图标</el-breadcrumb-item>
             <el-breadcrumb-item>用户分布</el-breadcrumb-item>
        </template>
       </userdistributed-bread>
       <div class="userpiechart">
          <div ref="mian" style="width:100%; height:450px;"></div>
       </div>
  </div>
</template>

<script>
import UserdistributedBread from '../../components/common/Bread'
export default {
  name: 'userdistributed',
  data () {
    return{
    }
  },
  components:{
      UserdistributedBread,
  },
methods:{
   initData() {
       var myChart =this.$echarts.init(this.$refs.mian);
       myChart.setOption({
          title:{
             text: '某站点用户访问来源',//主标题
             subtext: '纯属虚构',//副标题
             x:'center',//x轴方向对齐方式,
             textStyle:{
               color:'red'
             }
          },
          tooltip:{
             trigger: 'item',
             formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
           series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'直接访问'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'},
                      {value:135, name:'视频广告'},
                      {value:1548, name:'搜索引擎'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur:10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
       })
   }
},
  // 初始化饼图
  mounted () {
     this.initData();
  }
}
</script>

<style lang="stylus" scoped>
  .userpiechart
    width:80%;
    padding:20px;
    margin:0 auto;
</style>