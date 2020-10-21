<template>
  <div class="hello">
    <h1>购物车</h1>
   
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getlist(){
      console.log("购物车页面");
       console.log(this.$router)
       console.log(this.$route)
    }
  },
  mounted(){
    this.getlist();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>