<template>
  <div class="item">
      
  </div>
</template>

<script>
export default {
  name: 'found',
  data() {
     return{

     } 
  },
  methods:{
    getitem () {
        let name = "index";
        let info = "hello world"
        let m = `i am ${name},${info}`
        console.log(m)
        
    }
  },
  mounted () {
    this.getitem()
  }
}
</script>

<style scoped>
   .item{
      width:500px;
      height:500px;
      margin: 0 auto;
      border:1px solid #ccc;
      box-shadow: 0 0 10px #ccc;
   }
</style>
