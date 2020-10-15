<template>
  <div class="container">
    <div class="selGysDiv" v-show="gysStatus">
      <div class="selContent" @click="changeGys">
        <div class="selWd">
          切换经销商
        </div>
        <div class="selGysName">
          ︵<span>{{gysname}}</span>︶
        </div>
      </div>
      <div class="selBottom"></div>

    </div>
    <div class="login-icon">
      <div v-if="logoimg">
        <img :src="logoimg" alt="" class="login-img" />
      </div>
      <div v-else>
        <img src="../../assets/logo.png" alt="" class="login-img" />
      </div>
    </div>
    <div class="gysname">{{gysname}}</div>
   <div class="btnlist">
     <img src="../../assets/login_username.png" alt="" />
     <input type="text" placeholder="手机号" v-model="userphone" maxlength="11" @input="getMobile($event)" />
     <img src="../../assets/close.png" alt="" @click="clearMobile" />
   </div>
   <div class="btnlist">
     <img src="../../assets/login_locked.png" alt="" />
     <input type="password" placeholder="密码"  v-model="password" maxlength="11" />
     <img src="../../assets/close.png" alt="" @click="clearPassword" />
   </div>
   <div class='loginbtn' @click="onSubmit">登录</div>
    <div class="commpny">快消互联科技发展有限公司技术支持</div>
    <van-popup v-model="showlist" position="bottom" :style="{ height: '50%' }">
      <div class="listbox">
        <div class="list" v-for="(item,index) in gyslist" :key="index" @click="selectGys(item)">{{item.organizationName}}</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { GetGys, Login,hotGoodList} from "@/api/login"
import { getUserName,getPassWord,setUserName,setPassWord } from "@/utils/app.js"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      gysname:'',
      showlist:false,
      gyslist:[],
      logoimg:"",
      userphone:"",
      password:"",
      gysStatus:false,
      gys_no:'',
    }
  },
  mounted(){
    // if(this.userphone !=""&&this.userphone.length=='11'){
    //   var params = {
    //       mobile: this.userphone
    //   }
    //   this.getGysList(params);
      
    // }
    this.getCookieName()
    
  },
  methods:{
    getCookieName(){
      let username =getUserName();
      let password =getPassWord();
      if(username){
        var params = {
          mobile: username
        }
        this.getGysList(params);
        this.userphone =username;
        this.password =password;
      }
    },
    getGysList(params){
      GetGys(params).then(res =>{
        console.log(res);
        if (res.data.data.length > 0) {    
          this.gyslist =res.data.data;
          this.gysStatus =true;
          this.gysname =res.data.data[0].organizationName;
          this.gys_no =res.data.data[0].organizationNo;   
        } else {
          this.$notify(
            { type: 'danger', message: '该账号未注册!' }
          );
          
        }
      })
    },
    //切换供应商
    changeGys(){
      this.showlist =true;
    },
    //选择供应商
    selectGys(val){
      this.gysname =val.organizationName;
      this.logoimg =val.gysLoginUrl;
      this.gys_no =val.organizationNo;
      this.showlist =false;
    },
    //获取手机号
    getMobile(event){
       var phonenumber = event.currentTarget.value;
       if (phonenumber.length=='11'){
          if (!(/^1[3456789]\d{9}$/.test(phonenumber))){
            this.$notify(
              { type: 'danger', message: '请输入正确的手机号' }
            );
          }else{
            var params = {
              mobile: phonenumber
            }
            this.getGysList(params);                 
          }
        }
       
    },
    //清空用户名
    clearMobile(){
      this.userphone ="";
      this.password ="";
    },
    //清除密码
    clearPassword(){
      this.password ="";
    },
    //提交
    onSubmit() {
       console.log(this.$router);
       var params={
          mobile:this.userphone,
          login_password:this.password,
          gys_name: this.gysname,
          gys_no: this.gys_no
        }
      Login(params).then(res =>{
        console.log(res);
        setUserName(this.userphone)
        setPassWord(this.password)
        this.$router.push({path:'/base/home'})
        //this.gethotgoodlist()
      }).catch(err =>{})
      
    },
    //热销商品列表
    gethotgoodlist(){
      console.log(this.$router);
      var params ={
        pager: {
          currentPage: 1,
          pageSize: 10
        }
      }
      hotGoodList(params).then(res =>{
        console.log(res);
        
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  height:100%;
  width:100%;
  overflow: hidden;
  background-color:#fff;
}
.container{
  width:100%;
  height:100%;
  padding:0 1.333rem;
  box-sizing: border-box;
  overflow: hidden;
}
 .selGysDiv {
    position: fixed;
    top: 0;
    right: 0;
    width: 4rem;
    background: #1E90FF;
    height: max-content;
}


.selBottom {
    width: 0;
    height: 0;
    border-top: 1.33rem solid #1E90FF;
    border-right: 1.67rem solid white;
    border-bottom: 2.67rem solid white;
    border-left: 2.33rem solid white;
}

.selContent {
    height: max-content;
    overflow: hidden;
    color: #fff;
    padding: 0.5rem 0.5rem 0.333rem;
}

.selWd {
    border: 1px solid white;
    font-size: 13px;
    float: left;
    width: 1.33rem;
    text-align: center;
    word-break: break-all;
}

.selGysName {
    float: right;
    width: 0.8rem;
    font-size: 0.8rem;
    word-break: break-word;
    line-height: 0.8rem;
    text-align: center;
}
.listbox{
  width:100%;
  height:100%;
  overflow: hidden;
}
.list{
  width:100%;
  height:3rem;
  line-height:3rem;
  font-size: 1rem;
  text-align: center;
  border-bottom: 1px solid #eee;
}
/*登录图片*/
.login-icon{
  width: 5.33rem;
  height: 5.33rem;
  margin: 0 auto;
  margin-top: 5.33rem;
  margin-bottom:2rem;
}
.login-img{
  width: 5.33rem;
  height: 5.33rem;
  /* border-radius: 110rpx; */
  /* opacity: 0.6; */
}
.login .van-button--large {
width:100%;
height:3rem;
line-height:3rem;
margin-top:2rem;
}
.gysname{
  width:100%;
  height:3rem;
  line-height: 3rem;
  text-align: center;
  color:#1E90FF;
  font-size: 0.8rem;
}

.btnlist {
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    -o-box-orient: horizontal;
    box-orient: horizontal;
    position: relative;
    margin-top: 1.71875rem;
    border-bottom: 1px solid #1e90ff;

}

.btnlist img {
    margin-right: 0.667rem;
    margin-top: 0.55rem;
    width: 1.333rem;
    height: 1.333rem;
    display: inline-block;
}
.btnlist input {
    flex: 1;
    display: block;
    border: none;
    height: 2.667rem;
    line-height: 2.667rem;
    outline: none;
    font-size: 0.875rem;
    background: none;
}
.loginbtn{
  background:#1E90FF;
  color:#fff;
  width:100%;
  height:3rem;
  border-radius: 1.5rem;
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
  margin-top:2rem;
}
.commpny{
  width:100%;
  height:3rem;
  line-height: 3rem;
  font-size: 0.8rem;
  color:rgb(153,153,153);
  text-align: center;
}
</style>
