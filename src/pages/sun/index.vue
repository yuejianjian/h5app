<template>
  <div class="hello">
    <h1>子页面</h1>
    <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'Sun',
  props:{
      msg:{
         type:String,        
      }
  },
  data () {
    return {
        
    }
  },
  mounted(){
      console.log(this.msg);
      //console.log(this.$route.query.searchvalue);
       //console.log(this.$route.params.searchvalue);

  },
  methods:{
      parentHandleclick(e) {
        console.log(e)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>