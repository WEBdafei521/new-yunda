<template>
  <div class="yunda">
    <l-background/>
    <div class="l-login-box">
      <div class="l-box" :style="shows">
        <div class="l-login-left">
          <div>
            <!-- <div>logo</div>
            <span>云达用油管理中心</span> -->
          </div>
        </div>
        <div class="l-login-right">
          <div class="l-login-wec">欢 迎 使 用</div>
          <div class="l-login-inp">
            <img style="widht:16px;" src="../assets/icon/username.png" >
            <input type="text" placeholder="请输入账号" v-model="username">
          </div>
          <div class="l-login-inp">
            <img style="widht:16px;" src="../assets/icon/pwd.png" >
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="l-login-test l-login-inp">
            <div>
              <img style="widht:21px;" src="../assets/icon/test.png">
              <input type="text" placeholder="请输入验证码" v-model="yzm">
            </div>
            <div style="width:100px;height:28px;border-radius:6px;overflow:hidden;"><img @click="changeImg" :src="imgSrc" style="width:102px;height:auto;" ></div>
          </div>
          <div class="l-login-in btn btn-primary btn-ghost btn-shine" @click="onSubmit">登录</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import particles from '../components/Li-particles'
var baseUrl="http://121.199.72.39:8080/";
import {indexNav} from '../api/request'
import { Message, Loading } from 'element-ui'
// import { Loadings } from '../public/loading'
import {loginIn} from '../api/request'
export default {
  name: 'yunda',
  components:{
    'l-background':particles,
  },
  data () {
    return {
      shows:"opacity: 0;transform: translate3d(0, -0px, 0)",
      warnning:"提示",
      username:"",
      password:"",
      yzm:"",
      // 验证码图片路径
        imgSrc:"",
      randomStr:"",
      errors:false,
      isClick:false
    }
  },
  created(){
  },
  mounted(){
    var that = this
    setTimeout(function(){
        that.handleScroll();
    },1000)
    // 获取验证
    this.changeImg()
  },
   methods: {
     onSubmit(){
          var _this=this;
          if(!this.isClick){
            _this.isClick=true
            var username=_this.username;
            var password=_this.password;
            var yzm=_this.yzm;
            var isError=_this.checkInputValue(username,password,yzm);
            if(isError){
                _this.login(username,password,yzm)
            }else{
               _this.isClick=false
            }
            
          }
          
      },
     changeImg(){
          this.randomStr = Math.floor(Math.random()*999999999);
          this.imgSrc=baseUrl+"sys/code/"+this.randomStr;
      },
      handleScroll(){
       var that = this;
        that.shows="opacity: 1; transform: translate3d(0, -50px, 0)"
      }, 
      login(username, password, checkCode){
        var _this=this;
        var data={
            username:username,
            password:password,
            captcha:checkCode,
            randomStr:this.randomStr
        }

        loginIn(data).then(res=>{
            _this.isClick=false;
            if(res.code == 0){//登录成功
                     Message({
                        message: '登录成功',
                        type: 'success',
                        duration: 3 * 1000
                    })
                    // 同步存储token到vuex当中 使用的是mutations
                    _this.$store.commit('SET_TOKEN',res.token);
                    _this.$store.commit('SET_USER_INFO',res.user);
                    _this.$store.commit('SET_USER_DEPT',res.dept);
					          localStorage.setItem("yd_user_info", JSON.stringify(res.user));
                    localStorage.setItem("yd_user_dept", JSON.stringify(res.dept));
                    localStorage.setItem("tokens", res.token);
                    var pathKey = sessionStorage.getItem("pathKey")
                    if(pathKey){
                      _this.$router.push(pathKey)
                    }else{  
                      _this.$router.push('/main')
                    }
                    
                  
		        }else{
                    Message({
                        message: '网络错误' + res.msg,
                        type: 'error',
                        duration: 3 * 1000
                    })
              _this.changeImg();
              _this.yzm = '';
		        }
            
            
        })
      },
      // 验证输入信息是否为空   
      checkInputValue(username, password, checkCode){
          var _this=this;
          if(username.length==0){
              Message({
                        message: '用户名输入不能为空',
                        type: 'error',
                        duration: 3 * 1000
                    })
              _this.errors=true;
              return false;
          }
          if(password.length==0){
              Message({
                        message: '密码输入不能为空',
                        type: 'error',
                        duration: 3 * 1000
                    })
              _this.errors=true;
              return false;
          }
          if(checkCode.length==0){
             Message({
                        message: '验证码输入不能为空',
                        type: 'error',
                        duration: 3 * 1000
                    })
             _this.errors=true;
             return false;
          }
           _this.errors=false;
          return true;
      },
   }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.l-login-box{
  position: fixed;
  z-index: 999;
    width: 100vw;
    height: 100vh;
    top:0;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
} 
.l-box{
    opacity: 0;
    transform: translateZ(0);
    perspective: 1000px;
    backface-visibility: hidden;
    transition: 1.5s all cubic-bezier(0.39,0.575,0.565,1);
    display: flex;
  margin-top: 100px;
}
.l-login-left{
  width: 800px;
  height: 350px;
  /* background: rgba(255,255,255,.4); */
}
.l-login-left>div{
  margin: 80px auto;
  text-align: center;
  font-size: 14px;
}
.l-login-right{
  width: 250px;
  height: 280px;
  background: rgba(89, 124, 185, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;border-radius: 8px;
}
.l-login-wec{
  margin: 30px 0 20px 0;
  font-size: 14px;
  font-weight: 600;
  /* color: rgb(20, 99, 247); */
  color: white;
}
.l-login-inp{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #d3c2c2;
  margin-top:8px ;
  padding: 0 0 0 8px;
  border-radius: 6px;
  overflow: hidden;
}
.l-login-right img{
  width:16px;
  height: 16px;
}
.l-login-right input{
  border: 0;
  width: 180px;
  height: 30px;
  outline: none;
  padding-left: 8px;
  box-sizing: border-box;
  background: transparent;
  color: white;
}
.l-login-test>div{
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top:4px ; */
}
.l-login-test input{
  width: 80px;
  height: 30px;
  outline: none;
  
}
/* 占位符大小 */
::-webkit-input-placeholder { color:#b8b3b3;font-size: 12px; }
::-moz-placeholder { color:#f00;font-size: 12px; } /* firefox 19+ */
:-ms-input-placeholder { color:#f00;font-size: 12px; } /* Internet Explorer 10+ */
:-moz-placeholder { color:#f00;font-size: 12px; } /* firefox 14-18 */
.l-login-in{
  width: 200px;
  height:30px;
  line-height: 30px;
  text-align: center;
  margin-top: 21px;
  }
.btn {
  --hue: 190;
  position: relative;
  color: rgb(20, 99, 247);
  text-decoration: none;
  text-transform: uppercase;
  background-color: hsl(var(--hue), 100%, 41%);
  border: 1px solid hsl(var(--hue), 100%, 41%);
  outline: transparent;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;}
  .btn:hover { background: hsl(var(--hue), 100%, 31%);}
  .btn-primary { --hue: 187;}
  .btn-ghost { color: hsl(var(--hue), 100%, 41%);background-color: #409EFF; border-color: hsl(var(--hue), 100%, 41%);}
  .btn-ghost:hover { color: white;}
  .btn-shine { color: white;font-size: 14px;}
  .btn-shine::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        hsla(var(--hue), 100%, 41%, 0.5),
        transparent
      );
      transform: translateX(-100%);
      transition: .6s;
    }
.btn-shine:hover {
      background: transparent;
      box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
    }
.btn-shine:hover::before {
      transform: translateX(100%);
    }

</style>
