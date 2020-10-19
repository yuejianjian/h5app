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
        <van-swipe :autoplay="3000" :loop="false">
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


      <van-swipe :width="120" class="swipebox" :show-indicators="false">
        <van-swipe-item class="swipelist" v-for="(item,index) in changgoulist" :key="index">
          <img :src="item.photo_url" alt="">
          <div class="changname">{{item.goods_name}}</div>
          <div class="changprice">{{item.sales_info_detail[0].sales_price_desc}}</div>
        </van-swipe-item>
        
      </van-swipe>
      <!-- <h2 v-if="data|isNullOrEmpty">是为空</h2>
      <h2 v-else>不为空</h2> -->
    </div>
    <div class="cubigbox">
      <div class="commontilte">
        <img src="../../assets/hot.png" alt="" class="inco-1" />
        <div class="inco-name">热销商品</div>
      </div>
      <div class="hotgoodall">
        <div class="hotlist" v-for="(item,index) in hotGoodList" :key="index">
          <div class="listtubox">
            <img v-if="item.photo_url" :src="item.photo_url" alt="" class="goodstu"/>
            <img v-else src="../../assets/mo-1.png" alt="" />
            <img src="../../assets/buhuozhong.png" v-if="item.sales_info_detail[0].showStockCount==0" alt="" class="butu" />
            <img src="../../assets/goods_promotion.png" v-if="item.ifPromotion" alt="" class="cuxiao" />        
          </div>
          <div class="goodsname">{{item.goods_name}}</div>
          <div class="xiaoshu" v-if="isStockOpen=='Y'">{{item.sales_info_detail[0].showStockCount>0?'库存充足':'补货中'}}</div>
          <div class="xiaoshu" v-if="item.sales_info_detail[0].isLimit =='2'">首件优惠</div>
          <div class="pricebox" v-for="(cuitem,index2) in item.sales_info_detail" :key="index2" >
            <div class="goodsprice" v-if="cuitem.sales_price !=cuitem.discountPrice" style="text-decoration:line-through">
              ¥{{cuitem.sales_price_desc}}
            </div>
            <div class="goodsprice" v-if="cuitem.sales_price !=cuitem.discountPrice">
              ¥{{cuitem.discountPrice}}/{{cuitem.specific_name}}
            </div>
            <div class="goodsprice" v-if="cuitem.sales_price ==cuitem.discountPrice">
              ¥{{cuitem.sales_price_desc}}
            </div>
          </div>
          <div class="cart-add">
            <img src="../../assets/goods_return.png" alt="" class="tuihuo" v-if="item.return_policy=='SUPPORT_RETURN'" />
            <img src="../../assets/mj.png" alt="" class="huodong" v-if="item.promotion_type=='MJ'" />
            <img src="../../assets/mz.png" alt="" class="huodong" v-if="item.promotion_type=='MZ'" />
            <img src="../../assets/dz.png" alt="" class="huodong" v-if="item.promotion_type=='DZ'" />
            <div class="addbtntwo">
              <img src="../../assets/jian.png" alt="" class="jian" />
              <span class="showshu">{{item.shopCartCount}}</span>
              <img src="../../assets/jia.png" alt="" class="jia" @click="gotoBuy(item)" />
            </div>
            <div class="num" v-if="item.shopCartCount>0&&item.sales_info_detail.length>1">{{item.shopCartCount}}</div>
          </div>
        </div>
      </div>
    </div>
    <Specification @up="hideSpec" v-if="isShow" v-bind:messageData="itemData"></Specification>
  </div>
</template>

<script>
import {getBannerList,userPurchaseGoods,hotGoodList} from "@/api/login"
import Specification from "@/components/sideslip/sideslip.vue"
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bannerlist:[],
      searchvalue:"",
      price:100,
      data:1,
      changgoulist:[],
      hotGoodList:[],
      isStockOpen:'Y',
      isShow:false,
      itemData:{}
    }
  },
   components: {
        Specification: Specification
    },
  filters:{
    guolvqi(val){
      return val.toFixed(2)
    }
  },
  mounted(){
    console.log(this.$store.state.app.name);
    this.getBannerList();
    this.getuserPurchaseGoods();
    this.getHotGoodList();
  },
  methods:{
    hideSpec(msg) {
        this.isShow = msg.isShow;
    },
    //去添加购物车
    gotoBuy(val){
      console.log(val);
      this.itemData={};
      this.itemData =val;
      this.isShow =true;
    },
    //获取热销商品列表
    getHotGoodList(){
      var params={
        pager: {currentPage: 1, pageSize: 10}
      }
      hotGoodList(params).then(res =>{
        console.log(res); 
        this.hotGoodList =res.data.data;  
      }).catch(err =>{
        
      })
    },
    //获取常购商品列表
    getuserPurchaseGoods(){
      var params={
        pager: {currentPage: 1, pageSize: 10}
      }
      userPurchaseGoods(params).then(res =>{
        console.log(res); 
        this.changgoulist =res.data.data;  
      }).catch(err =>{
        
      })
    },
    getBannerList(){
      getBannerList({}).then(res =>{
        console.log(res); 
        this.bannerlist =res.data.data;  
      }).catch(err =>{

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
    background-color: #F7F7F7 !important;
  }
  .searchbox{
    position: fixed;
    top:0;
    height:3rem;
    width:100%;
    background-color:#1e90ff;
    z-index: 1000;
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
    margin-top:-0.333rem;
    padding:0px;
    text-align: center;
  }
  .cubigbox{
    width:100%;
    height:auto;
    overflow: hidden;
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
    width:7rem;
    padding:0.5rem;
    box-sizing: border-box;
    height:11rem;
  }
  .swipelist img{
    width:6rem;
    height:6rem;
    margin:0 auto;
  }
  .swipelist .changname,  .swipelist .changprice{
    width:100%;
    height:2rem;
    line-height:2rem;
    font-size: 1rem;
    text-overflow:ellipsis; 
    white-space:nowrap; 
    overflow:hidden;

  }

/*  */
.hotgoodall{
    width:100%;
    height:auto;
    padding:0 0.75rem;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 4rem;
  }
  .hotgoodall .hotlist{
    width:11.533rem;
    height:auto;
    overflow: hidden;
    background-color:#fff;
    margin-bottom: 0.666rem;
  }
  .listtubox{
    width:7.9333rem;
    height:7.9333rem;
    position: relative;
    margin:0.333rem 1.7rem 0px;
  }
  .hotgoodall .hotlist .listtubox .goodstu{
    width:7.9333rem;
    height:7.9333rem;
    position: absolute;
    top:0px;
    left:0px;
  }
  .hotgoodall .hotlist .listtubox .butu{
    width:7.9333rem;
    height:7.9333rem;
    position: absolute;
    top:0px;
    left:0px;
    z-index: 100;
  }
.hotgoodall .hotlist .listtubox .cuxiao{
    width:2.333rem;
    height:2.333rem;
     position: absolute;
    top:0.333rem;
    left:0.333rem;
    z-index: 10;
  }
  .hotgoodall .hotlist .goodsname{
    line-height: 1.333rem;
    padding:0 0.666rem;
    box-sizing: border-box;
    font-size: 0.8rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(18,18,18,1);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap:break-word;
    text-align: left;
  }
  .pricebox{
    width:100%;
    height:1.333rem;
    line-height: 1.333rem;
    padding:0 0.6667rem;
    box-sizing: border-box;
  }
  .hotgoodall .hotlist .goodsprice{
    float: left;
    height:1.333rem;
    line-height: 1.333rem;
    font-size:0.8rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(215,22,24,1);
    margin-right:0.333rem;
  }
.hotgoodall .hotlist .xiaoshu{
    width:100%;
    height:1.333rem;
    line-height: 1.333rem;
    padding:0 0.6667rem;
    box-sizing: border-box;
    font-size:0.8rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(215,22,24,1);
    text-align: left;
  }
  .hotgoodall .hotlist .jianyi{
    width:100%;
    height:auto;
    line-height: 1.333rem;
    font-size: 0.8rem;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    padding:0 0.6667rem;
    box-sizing: border-box;
  }
  .hotgoodall .hotlist .xiaoshu{
    font-size: 0.8rem;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-top:0.333rem;
  }
  .showbottom{
    width:100%;
    height:1.333rem;
    line-height: 1.333rem;
    text-align: center;
    margin:1rem auto;
  }
  .bottombox{
    width:7.333rem;
    height:1.333rem;
    line-height: 1.333rem;
    margin:0 auto;
  }
  .bottombox img{
    width:1.6rem;
    height:1rem;
    margin-top:0.1rem;
    margin-right:0.2rempx;
    float: left;
  }
  .bottombox .msg{
    width:5rem;
    height:1.333rem;
    line-height: 1.333rem;
    font-size:0.8rem;
    float: left;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }

.cart-add{
  width:100%;
  height:2.6667rem;
  padding:0 0.667rem;
  box-sizing: border-box;
  position: relative;
  margin-top:0.667rem;
}
.cart-add .tuihuo{
  width:1.667rem;
  height:1.667rem;
  float: left;
  margin-top:0.5rem;
  margin-right: 0.1665rem;
  /* top:15rpx;
  position: absolute;  */
}
.cart-add .huodong{
  width:1.667rem;
  height:1.667rem;
  float: left;
  margin-top:0.5rem;
  margin-right: 0.1665rem;
  /* top:15rpx;
  left:120rpx;
  position: absolute;  */
}
.cart-add .num{
  position: absolute;
  width:1.667rem;
  height:1.667rem;
  top:-0.5rem;
  border-radius: 50%;
  background-color:red;
  font-size: 0.8rem;
  color:#fff;
  line-height: 1.667rem;
  text-align: center;
  right:1.333rem;
}
.addbtn{
  width:2.333rem;
  height:2.333rem;
  right: 1.666rem;
  top:0.1665rem;
  position: absolute; 
}
.addbtntwo{
  height:2.333rem;
  right: 1.666rem;
  top:0.1665rem;
  position: absolute; 
  line-height: 2.333rem;
}
.addbtntwo .jian{
  width:1.333rem;
  height:1.333rem;
  float: left;
  margin-top:0.5rem;
}
.addbtntwo .showshu{
  height:2.333rem;
  line-height: 2.333rem;
  font-size: 1rem;
  color:#000;
  margin:-0.667rem 0.667rem 0px;
  display: inline-block;
}
.addbtntwo .jia{
  width:1.333rem;
  height:1.333rem;
  float: right;
  margin-top:0.5rem;
}
</style>
