<template>
  <div class="hello">
    <h1>首页</h1>
    <div @click="gotodetails">去详情</div>
   
  </div>
</template>

<script>
import {getBannerList} from "@/api/login"
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.getBannerList();
  },
  methods:{
    getBannerList(){
      getBannerList({}).then(res =>{
        console.log(res);   
      })
    },
    gotodetails(){
      this.$router.push({
        path:'/gooddetails'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
