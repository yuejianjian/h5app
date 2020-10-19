<template>
  <div id="Tabbar">
    <router-link class="home" tag="div" to="/base/home">首页</router-link>
    <router-link class="article" tag="div" to="/base/fenlei">商品</router-link>
    <router-link class="shop" tag="div" to="/base/shop">进货单<span>￥{{shopCartAmount}}</span></router-link>
     <router-link class="my" tag="div" to="/base/my">我的</router-link>
  </div>
</template>

<script>
  //import Bus from '@/store/bus.js'
  export default {
    data() {
      return {
        shopCartAmount:'11.01'
      }
    },
    filters:{
      formatMoney(val) {
        if(!isNaN(val)) {
          return val.toFixed(2);
        }
      }
    },
    mounted() {
    //   this.getShopCartAmount()
    //   Bus.$on('getAmount', (e) => {
    //     this.shopCartAmount = e
    //   })
    //   Bus.$on('getAmountReq', () => {
    //     this.getShopCartAmount();
    //   })
    },
    methods:{
    //   getShopCartAmount() {
    //     this.api.getShopCartAmount({}).then(res=> {
    //       if(res.callStatus == 'SUCCESS') {
    //         this.shopCartAmount = res.data.shopcart_amount           
    //       }
    //     })
    //   },

    }
  };
</script>
<style scoped>
#Tabbar{
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFF;
  z-index: 999;
}
#Tabbar>div {
  width:25%;
  text-align: center;
  height: 1rem;
  padding-top: 2rem;
  font-size: 0.8rem;
}
#Tabbar .mint-tab-item-label {
  color: #999999;
  height: 1.33rem;
}
#Tabbar .home.active{
  background: url('../../assets/ic_home_pre.png') no-repeat center top;
  color: #1E90FF;
  background-size: 2rem 2rem;
}
#Tabbar .home{
  background: url('../../assets/ic_home.png') no-repeat center top;
  background-size: 2rem 2rem;
}
#Tabbar .article.active{
  background: url('../../assets/ic_shangping_pre.png') no-repeat center top;
  color: #1E90FF;
 background-size: 2rem 2rem;
}
#Tabbar .article{
  background: url('../../assets/ic_shangpin.png') no-repeat center top;
  background-size: 2rem 2rem;
}
#Tabbar .shop.active{
  background: url('../../assets/ic_jinhuodan_pre.png') no-repeat center top;
  background-size: 2rem 2rem;
  color: #1E90FF;
}
#Tabbar .shop{
  position: relative;
  background: url('../../assets/ic_jinhuodan.png') no-repeat center top;
  background-size: 2rem 2rem;
}
#Tabbar .my.active{
  background: url('../../assets/ic_wode_pre.png') no-repeat center top;
  background-size: 2rem 2rem;
  color: #1E90FF;
}
#Tabbar .my{
  position: relative;
  background: url('../../assets/ic_wode.png') no-repeat center top;
  background-size: 2rem 2rem;
}
#Tabbar .shop span {
  position: absolute;
  top: -10px;
  right: -0.8rem;
  background: #ff6754;
  color: #fff;
  border-radius: 20px;
  padding: 2px 5px;
  font-size: 0.8rem;
}
</style>
