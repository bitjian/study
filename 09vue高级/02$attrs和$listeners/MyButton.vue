<template>
  <el-button v-bind="customAttrs" v-on="$listeners"></el-button>
</template>

<script>
export default {
  name: 'MyButton',
  inheritAttrs:false, // 让没有在props里什么的属性，也可以绑定到子元素上，不然绑定的是子元素的根元素上
  props: {

  },
  computed: {
    customAttrs() {
      return {
        size: 'mini',
        ...this.$attrs
      }
    }
  }
}
</script>

<style>

</style>