<template>
  <div class="explain">
      <!-- 头部面包屑组件 -->
       <explain-bread>
        <template v-slot:dataManage>
             <el-breadcrumb-item>说明</el-breadcrumb-item>
        </template>
       </explain-bread>
       <div class="container">
          <explain-baidu></explain-baidu>
       </div>
  </div>
</template>

<script>
import ExplainBread from '../../components/common/Bread'
import ExplainBaidu from '../../components/common/Mapbaidu'
export default {
  name: 'runsite',
  components:{
      ExplainBread,
      ExplainBaidu
  }
}
</script>

<style lang="stylus" scoped>
  .container
    width:100%;
    height:800px;
    border:1px solid #000;
</style>