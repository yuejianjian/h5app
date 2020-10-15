<template>
  <div class="hello">
    <h1>子页面</h1>
    <div>{{msg.name}}</div>
    <div @click="getBaBa">发消息给巴巴</div>
  </div>
</template>

<script>
export default {
  name: 'Sun',
  props:{
    routerData:{
      type:Object,
      default:null
    }
  },
  data () {
    return {
        msg:this.routerData
    }
  },
  mounted(){
      console.log(this.routerData);
      //console.log(this.$route.query.searchvalue);
       //console.log(this.$route.params.searchvalue);

  },
  methods:{
      parentHandleclick(e) {
        console.log(e)
      },
      getBaBa(){
        this.$emit('babamsg',"我买房了")
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>