<template>
  <div class="homepage">
    <div class="searchbox">
      <div class="saoma">
        <img src="../../assets/sao.png" alt="">
      </div>
      <van-search v-model="searchvalue" placeholder="请输入搜索关键词" class="search" />
      <div class="serchbtn" @click="searchbtn">搜索</div>
    </div>
    <div class="lunbo">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in bannerlist" :key="index">
            <lazy-component>
              <img v-lazy="image.photoUrl" />
            </lazy-component>
          </van-swipe-item>
        </van-swipe>
    </div>
    <div class="incolist">
      <div class="incoone">
        <img src="../../assets/new.png" alt="" />
        <div class="msg">新品上架</div>
      </div>
      <div class="incoone">
        <img src="../../assets/zu.png" alt="" />
        <div class="msg">卖家推荐</div>
      </div>
      <div class="incoone">
        <img src="../../assets/hot.png" alt="" />
        <div class="msg">热销商品</div>
      </div>
      <div class="incoone">
        <img src="../../assets/conpon.png" alt="" />
        <div class="msg">优惠劵</div>
      </div>
      <div class="incoone">
        <img src="../../assets/cu.png" alt="" />
        <div class="msg">促销活动</div>
      </div>
    </div>
    <div class="cubigbox">
      <div class="commontilte">
        <img src="../../assets/inco-2.png" alt="" class="inco-1" />
        <div class="inco-name">常购商品</div>
        <div class="chagengduo">
          <span class="cha">查看更多</span>
          <img src="../../assets/gengduo.png" alt="" />
        </div>
      </div>


      <van-swipe :loop="true" :width="150" class="swipebox">
        <van-swipe-item class="swipelist">1</van-swipe-item>
        <van-swipe-item class="swipelist">2</van-swipe-item>
        <van-swipe-item class="swipelist">3</van-swipe-item>
        <van-swipe-item class="swipelist">4</van-swipe-item>
        <van-swipe-item class="swipelist">5</van-swipe-item>
        <van-swipe-item class="swipelist">6</van-swipe-item>
      </van-swipe>
      <h1>{{price| guolvqi}}</h1>
      <h2 v-if="data|isNullOrEmpty">是为空</h2>
      <h2 v-else>不为空</h2>
    </div>
  </div>
</template>

<script>
import {getBannerList} from "@/api/login"
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bannerlist:[],
      searchvalue:"",
      price:100,
      data:1
    }
  },
  filters:{
    guolvqi(val){
      return val.toFixed(2)
    }
  },
  mounted(){
    console.log(this.$store.state.app.name);
    this.getBannerList();
  },
  methods:{
    getBannerList(){
      getBannerList({}).then(res =>{
        console.log(res); 
        this.bannerlist =res.data.data;  
      })
    },
    //去查询
    searchbtn(){
      console.log(this.searchvalue);
      if(this.searchvalue !=""){
        // this.$router.push({
        //   path:'/searchlist',
        //   query:{
        //     searchvalue:this.searchvalue
        //   }
        // })
        this.$router.push({
          name:'SerachList',
          params:{
            searchvalue:this.searchvalue
          }
        })
      }else{
        this.$notify(
            { type: 'danger', message: '请输入查询关键词!' }
          );
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .homepage{
    width:100%;
    height:auto;
    overflow: hidden;
  }
  .searchbox{
    position: fixed;
    top:0;
    height:3rem;
    width:100%;
    background-color:#1e90ff;
  }
  .searchbox .saoma{
    width:3rem;
    height:3rem;
    float: left;
  }
  .searchbox .saoma img{
    width:2rem;
    height:2rem;
    margin-left:0.5rem;
    margin-top:0.5rem;
  }
  .searchbox .search{
    width:18rem;
    float: left;
  }
  .van-search{
    background:none;
    height:3rem;
  }
  .serchbtn{
    width:3rem;
    height:3rem;
    color:#fff;
    font-size: 1rem;
    line-height: 3rem;
    float: left;

  }
  .lunbo{
    width:100%;
    height:15rem;
    margin-top:3rem;
    overflow: hidden;
  }
  .lunbo img{
    width: 100%;
    height: 100%;
    transform: translate(0%, 0px) translateZ(0px);
  }
  .incolist{
  width:100%;
  height:5.333rem;
  overflow: hidden;
  display: flex;
  background-color:#fff;
  flex-direction: row;
  justify-content:space-around;
}
.incolist .incoone{
  width:4rem;
  height:10.6667rem;
}
.incolist .incoone img{
  width:4rem;
  height:4rem;
  margin:0px;
  padding:0px;
  }
  .incolist .incoone .msg{
    width:100%;
    height:1.5rem;
    line-height: 1.5rem;
    color:#666666;
    font-size: 0.8rem;
    margin-top:-10rpx;
    padding:0px;
    text-align: center;
  }
  .cubigbox{
    width:100%;
    height:auto;
    overflow: hidden;
    background-color:#fff;
  }
  .commontilte{
    width:100%;
    height:3rem;
    padding:0 0.75rem;
    box-sizing: border-box;
    overflow: hidden;
  }
  .commontilte .inco-1{
    width:1.5rem;
    height:1.5rem;
    float: left;
    margin-right: 0.333rem;
    margin-top:0.75rem;
  }
  .commontilte .inco-name{
    float: left;
    height:3rem;
    line-height: 3rem;
    font-size:1rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(185,92,231,1);
  }
  .commontilte .chagengduo{
    float: right;
  }
  .commontilte .chagengduo .cha{
    float: left;
    height:3rem;
    line-height: 3rem;
    font-size: 0.8rem;
    color:#999;
  }
  .commontilte .chagengduo img{
    width:1.6667rem;
    height:1.6667rem;
    float: right;
    margin-top:0.65rem;
  }
  .swipelist{
    height:10rem;
    background-color:#1e90ff;
  }
</style>
