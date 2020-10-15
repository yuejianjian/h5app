<template>
  <div class="hello">
    <h1>商品查询列表也</h1>
   <div @click="gotosun">点击</div>
   
   <child ref="mychild" :routerData="message" @babamsg="shoudaosun" />
  </div>
</template>

<script>
import Sun from "../sun/index"
export default {
  name: 'searchList',
  components:{
    child:Sun
  },
  data () {
    return {
      message:{
        name:'乐坚坚',
        age:'25'
      }
    }
  },
  mounted(){
      //console.log(this.$route.query.searchvalue);
       console.log(this.$route.params.searchvalue);
  },
  methods:{
      gotosun(){
        this.$refs.mychild.parentHandleclick("嘿嘿嘿");  
        //   this.$router.push({
        //       path:'/sun'
        //   })
      },
      shoudaosun(val){
        console.log("收到儿子的消息")
        this.message.name=val;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>