<template>
  <div class="fenleibox">
    <div class="searchbigbox">
      <div class="searchbox"></div>
      <div class="carttu">
        <img src="../../assets/search.png" alt="" />
      </div>
      <div class="carttu">
        <img src="../../assets/ic_jinhuodan.png" alt="" />
        <div class="shopamount">¥11.00</div>
      </div>
    </div>
   
  </div>
</template>

<script>
import {getClassificaionList} from "@/api/login"
export default {
  name: 'FenLei',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      classificationlist:[],
    }
  },
  methods:{
    getClassificaionList(){
      console.log(this.$router)
       console.log(this.$route)
      getClassificaionList({}).then(res =>{ 
        console.log(res.data.data);     
        this.classificationlist =res.data.data;  
      }).catch(err =>{
        
      })
    },
  },
  mounted(){
    this.getClassificaionList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fenleibox{
  width:100%;
  height:auto;
  overflow: hidden;
}
.searchbigbox{
  width:100%;
  height:4.333rem;
  overflow: hidden;
  border-bottom: 1px solid #E2E2E2;
  position: fixed;
  top:0rpx;
  z-index: 100;
  /* padding:0 0.667rem;
  box-sizing: border-box; */
  background-color:#fff;
}
.searchbox{
  width:15rem;
  height:4.333rem;
  background-color:#F6F6F6;
  float: left;
}
.searchtu,.carttu{
  width:4.333rem;
  height:4.333rem;
  float: left;
  text-align: center;
  position: relative;
}
.carttu img{
  width:2rem;
  height:2rem;
  margin:0 auto;
  margin-top:1.1665rem;
}

.carttu .shopamount{
  min-width: 3rem;
  height:1.333rem;
  line-height: 1.333rem;
  text-align: center;
  background-color:#ff6754;
  border-radius: 0.667rem;
  position: absolute;
  right:0rem;
  top:0.2rem;
  font-size: 0.7rem;
  color:#fff;
}
</style>