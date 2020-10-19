<template>
    <div id="specification">
        <div class="stance" @click="isShowFun()"></div>
        <div class="spec_content">
            <div class="list">
                <div class="imgBox">
                    <img class="categoryImg" :src="messageData.photo_url" :onerror="errorLoge">
                </div>
                <div class="textBox">
                    <p class="categoryName" v-cloak>{{messageData.goods_name}}</p>
                    <div class="details">
                        <!-- <p style="color:#929292">可销售：
                            <span v-cloak style="color:#929292" v-cloak>{{messageData.sales_info_detail[position].showStockCountType}}</span>
                        </p> -->
                        <p style="color:#929292">
                            <span v-cloak style="color:#1e90ff;">{{messageData.sales_info_detail[position].showStockCount>0?'库存充足':'补货中'}}</span>
                        </p>
                        <p v-cloak style="color:#929292" v-if="messageData.sales_info_detail[position].advice_sales_price">
                            (建议零售价:￥{{messageData.sales_info_detail[position].advice_sales_price}}/{{messageData.sales_info_detail[position].specific_name}})
                        </p>
                        </br>
                        <p v-cloak style="color:#FF6754">￥
                            <span>{{messageData.sales_info_detail[position].sales_price_desc}}</span>
                        </p>
                        <!-- <img class="logo" src="../../common/images/ic_jinhuodan.png"> -->
                    </div>
                </div>
            </div>
            <p class="dismember">销售规格</p>
            <div class="tapList">
                <div class="item" v-for="(item,index) in messageData.sales_info_detail" :class="{backgroundStyle:position==index}" :key="index" @click="choiceFun(index)">
                    <p v-cloak>{{item.package_specific}}</p>
                </div>
            </div>
            <p class="dismember">订购数量</p>
            <span>（起订量:{{messageData.sales_info_detail[position].min_purchased}} {{messageData.sales_info_detail[position].specific_name}}）</span>
            <div class="input_Num">
                <div class="minus" @click="minusFun()">-</div>
                <div class="inputNum"><input type="text" v-model="sum" @click="inpuOpenFun()"></div>
                <div class="added" @click="addedFun()">+</div>
                <span class="specification">{{messageData.sales_info_detail[position].specific_name}}</span>
            </div>
            <button class="joined" @click="addShopFun()" :disabled="isDisable">
                加入进货单
            </button>
        </div>
    </div>
</template>
<script>
// import { MessageBox } from "mint-ui";
//import Bus from '@/store/bus.js'
export default {
    props: ["messageData"],
    data() {
        return {
            sum: 0,
            position: 0,
            errorLoge:'this.src="' + require("../../assets/mo-1.png") + '"',
            isDisable:false
        };
    },
    methods: {
        minusFun() {
            if (
                this.sum <=
                this.messageData.sales_info_detail[this.position].min_purchased
            ) {
                this.$toast(
                    "最小起订数量" +
                        this.messageData.sales_info_detail[this.position]
                            .min_purchased
                );
                return false;
            }
            this.sum = this.sum - 1;
        },
        addedFun() {
            this.sum = this.sum + 1;
        },
        inpuOpenFun() {
            // MessageBox.prompt("", "", {
            //     message: "修改购买数量",
            //     inputValue: this.sum,
            //     inputType: "Number"
            // }).then(({ value, action }) => {
            //     var write = Number(value);
            //     // if (write == 0 || write < 0) {
            //     //     this.sum = this.sum;
            //     // } else {
            //     //     this.sum = write;
            //     // }
            //     if(write<this.messageData.sales_info_detail[this.position].min_purchased){
            //     this.sum=this.messageData.sales_info_detail[this.position].min_purchased;
            //     }else{
            //     this.sum=write;
            //     }
            // });
        },
        isShowFun() {
            this.isShow = false;
            this.position = 0;
            this.$emit("up", {
                isShow: this.isShow
            });
        },
        addShopFun() {
            let listData = {
                goods_qit: this.sum,
                goods_sales_info_id: this.messageData.sales_info_detail[
                    this.position
                ].goods_sales_info_id
            };
            this.isDisable=true;
            this.api.addShopCart(listData).then(res => {
                if (res.callStatus == "SUCCESS") {
                    this.isShowFun();
                    // this.$toast({
                    //     message: "加入进货单成功",
                    //     iconClass: "icon icon-success"
                    // });
                    this.bus(res.data)
                    this.isDisable=false;
                }else{
                    this.$toast(res.message)
                    this.isDisable=false;
                }
            });
        },
        choiceFun(val) {
            this.position = val;
            this.sum = this.messageData.sales_info_detail[val].min_purchased;
            console.log(this.mark);
        },
        bus(num) {
          console.log(num)
          Bus.$emit('getAmount', num)
        }
    },
    mounted() {
        this.sum = this.messageData.sales_info_detail[this.position].min_purchased;
    }
};
</script>
<style>
#specification {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
#specification .stance {
    width: 25%;
    height: 100%;
}
#specification .spec_content {
    width: 75%;
    height: 100%;
    padding: 1rem 1rem 0 1rem;
    background: #ffffff;
    text-align: left;
}
.spec_content .list {
    width: 100%;
    height: 7.5rem;
    /* padding: 40px 20px; */
    display: flex;
    border-bottom: 0.5px solid #eeeeee;
    margin-bottom: 1.6667rem;
}
.spec_content .list .textBox {
    display: inline-block;
    width: 60%;
    text-align: left;
}
.spec_content .list .imgBox {
    width: 5.8rem;
    height:5.8rem;
    margin-right: 0.667rem;
}
.list .imgBox .categoryImg {
    width: 100%;
    height: 100%;
}
.list .textBox .logo {
    width: 3.333rem;
    /* height: 50px; */
    float: right;
}
.list .textBox .details p {
    display: inline-block;
    /* display: flex; */
}
.tapList {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}
.tapList .item {
    width: 8.333rem;
    height: 2rem;
    background: #f0f0f0;
    text-align: center;
    line-height: 2rem;
    border-radius: 0.25rem;
    margin-bottom: 0.6667rem;
}
.dismember {
    margin-bottom: 1.333rem;
    display: inline-block;
    
}
.input_Num {
    width: 13rem;
    height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.input_Num .inputNum {
    width: 8.7rem;
    height: 1.6rem;
    line-height: 1.5rem;
    text-align: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}
.input_Num .inputNum input {
    width: 100%;
    text-align: center;
    border:none;
}
.input_Num .minus,
.added {
    width: 2.15rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    border: 1px solid #ccc;
}
.input_Num .minus {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    font-size: 1.6rem;
}
.input_Num .added {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    font-size: 1.6rem;
    color: red;
}
.specification {
    margin-left: 0.6667rem;
}
.joined {
    width: 77%;
    height: 3.28rem;
    text-align: center;
    line-height: 3.28rem;
    color: #ffffff;
    position: absolute;
    right: 0;
    bottom: 0;
    background: linear-gradient(to left, #1e90ff, #4fe4fa);
    border:none;
}
.tapList .backgroundStyle {
    background: #1e90ff;
    color: #ffffff;
}
</style>


