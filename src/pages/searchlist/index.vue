<template>
  <div class="hello">
    <h1>商品查询列表也</h1>
   <div @click="gotosun">点击</div>
   <child ref="mychild" :msg="msg" />
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
      msg: '乐坚坚1111111'
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
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>