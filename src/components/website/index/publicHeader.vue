<template>
  <div class="publicHeader">
    <div class="headerBox" :class="{ speH: isActive }">
      <div class="headerFirst">
        <div class="system_enter left" @click="gotoIndex">首页</div>
        <div class="yayi left" @click="salesEntry">绑定客户代表</div>
        <div class="yayi left" @click="gotoSales">创客系统入口</div>
        <div v-if="hasLogin" class="log right">
          <span class="logIn" @click="logIn" v-bind:style="{ color: activeInColor }">登录</span>/<span class="register" @click="register" v-bind:style="{ color: activeOutColor }">注册</span><span class="giveQb_word">（注册即赠60乾币）</span>
        </div>
        <div v-else class="log right">
          <span class="alreadyLog" @click="alreadyLog">{{username}}</span><span class="logOut" @click="logOut">退出</span>
        </div>
        <div class="my_order right" @click="myOrder">我的订单</div>
        <div class="shopping_car right">
          <img class="car_img" @click="gotocar" @mouseover="showCargo" src="../../../images/index/shopping_car.png" alt="img">
          <p class="left gwcHeader" @click="gotocar" @mouseover="showCargo">购物车<span class="car_num">{{car_num}}</span></p>
          <div v-if="cargo_show" class="whiteLine"></div>
          <div v-else class="elseLine"></div>
          <div class="car_hover" v-if="cargo_show">
            <p class="cargo_title">最近加入的产品：</p>
            <div class="cargo_box" v-for="item in filteredItems" :key="item.name" @click="gotoDetails(item)">
              <img class="cargo_sm" :src=item.pic alt="img">
              <div class="cargo_des">{{item.name}}</div>
              <div class="cargo_price">￥{{item.price}}*{{item.num}}</div>
              <div class="cargo_num">
                <span v-if="item.itemPropertyInfo">{{item.itemPropertyInfo}}</span>
                <span v-if="item.itemPropertyTwoValue">{{'；'+item.itemPropertyTwoValue}}</span>
                <span v-if="item.itemPropertyThreeValue">{{'；'+item.itemPropertyThreeValue}}</span>
                <span v-if="item.itemPropertyFourValue">{{'；'+item.itemPropertyFourValue}}</span>
                <span v-if="item.itemPropertyFiveValue">{{'；'+item.itemPropertyFiveValue}}</span>
                <span v-if="item.itemPropertySixValue">{{'；'+item.itemPropertySixValue}}</span>
              </div>
              <div class="cargo_rm" @click.stop="delete_cargo(item)">删除</div>
            </div>
            <div class="total_box">
              <p class="fir left">共<span style="color: #cb1700;">{{car_num}}</span>件商品</p>
              <p class="sec left">总计: <span style="color: #cb1700;">￥{{total_price}}</span></p>
              <div class="gotocar right" @click="gotocar">去购物车</div>
            </div>
          </div>
          <div class="car_hover1" v-else>
            暂无选购商品
          </div>
        </div>
        <div class="qbCharge right" @click="qbCharge">
        <img class="left" style="transform:translateY(5px);margin-right:8px;" src="../../../images/index/qianB.png" alt="img">
        <p class="left">乾币充值</p>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!--     短信密码登录 start    -->
    <div class="log_box" v-show="changeForget1">
      <el-collapse-transition>
        <div v-show="showLogin1">
          <div class="transition-box" v-bind:style="{ backgroundImage: bindBanner}">
            <div class="logIn_container">
              <div class="logIn_box">
                <p class="ms_register" @click="ms_register" @mouseover="arrow_in" @mouseout="arrow_out"><img v-if="arrowChange" src="../../../images/index/arrow_grey.png" alt="img" style="margin-right: 10px;"><img v-else src="../../../images/index/arrow_blue.png" alt="img" style="margin-right: 10px;">注册</p>
                <div class="logIn_header">
                  <div class="pwdLog" :class="{ speBottom: isLog2}" @click="pwdLog">密码登录</div>
                  <div class="messageLog" :class="{ speBottom: isLog1}" @click="messageLog">短信登录</div>
                </div>
                <div v-show="changeLog2" class="des_box">
                  <div>
                    <span>手机号：</span>
                    <input class="mobilePhone" type="text" v-model="pwd_mobilephone">
                    <transition name="shake">
                      <p v-show="pwdPhone_alert" class="error">请输入正确的手机号!</p>
                    </transition>
                  </div>
                  <div class="pwd_box">
                    <span>密码：</span>
                    <input class="pwd" type="password" v-model="pwd_pwd" @keyup.enter="pwd_logIn">
                    <transition name="shake">
                      <p v-show="pwdpwd_alert" class="error">请输入正确的密码！</p>
                    </transition>
                  </div>
                  <p class="forgetPwd" @click="forgetPwd">忘记密码</p>
                  <div class="logIn_btn2" @click="pwd_logIn">登录</div>
                  <!-- <p class="logIn_error">账号不存在，请重试！</p> -->
                </div>
                <div v-show="changeLog1" class="des_box">
                  <div>
                    <span>手机号：</span>
                    <input class="mobilePhone" type="text" v-model="ms_mobilephone">
                    <transition name="shake">
                      <p v-show="msPhone_alert" class="error">请输入正确的手机号!</p>
                    </transition>
                  </div>
                  <div>
                    <span>验证码：</span>
                    <input class="rightCode" type="text" v-model="ms_yzm" @keyup.enter="ms_logIn">
                    <button class="getCode" @click="hasYzm(ms_mobilephone)" v-if="hYzm">{{Yzm}}</button>
                    <button class="getCode" @click="hasYzm()" style="background-color: #C8C8C8;" v-else disabled>{{Yzm1}}</button>
                    <transition name="shake">
                      <p v-show="msCode_alert" class="error">请输入正确的验证码!</p>
                    </transition>
                  </div>
                  <div class="logIn_btn" @click="ms_logIn">登录</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <!--     短信密码登录 end    -->
    <!--     忘记密码 start    -->
    <div class="log_box2" v-show="changeForget2">
      <el-collapse-transition>
        <div v-show="showLogin2">
          <div class="transition-box" v-bind:style="{ backgroundImage: bindBanner}">
            <div class="logIn_container">
              <div class="forgetPwd_box">
                  <div>
                    <span>手机号：</span>
                    <input class="fg_mobilePhone" type="text" v-model="fg_mobilephone">
                    <transition name="shake">
                      <p v-show="fgPhone_alert" class="error">请输入正确的手机号!</p>
                    </transition>
                  </div>
                  <div>
                    <span>验证码：</span>
                    <input class="fg_rightCode" type="text" v-model="fg_code">
                    <button class="getCode" @click="fg_hasYzm(fg_mobilephone)" v-if="fg_hYzm">{{fg_Yzm}}</button>
                    <button class="getCode" style="background-color: #C8C8C8;" v-else disabled>{{fg_Yzm1}}</button>
                    <transition name="shake">
                      <p v-show="fgCode_alert" class="error">请输入正确的验证码!</p>
                    </transition>
                  </div>
                  <div class="fg_pwd_box">
                    <span>密码：</span>
                    <input class="fg_pwd" type="password" v-model="fg_pwd">
                    <transition name="shake">
                      <p v-show="fgPwd_alert" class="error">请输入有效的密码! 密码长度需在6到16位之间</p>
                    </transition>
                  </div>
                  <div class="fg_confirmPwd_box">
                    <span>确认密码：</span>
                    <input class="fg_confirmPwd" type="password" v-model="fg_confirmPwd" @keyup.enter="fg_confirm">
                    <transition name="shake">
                      <p v-show="fgConfirmPwd_alert" class="error">设置密码与确认密码不一致！</p>
                    </transition>
                  </div>
                  <p class="fg_alrHave" @click="fg_alrHave">返回登录</p>
                  <div class="fg_confirm_btn" @click="fg_confirm">确认</div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <!--     忘记密码 end    -->
    <!--     注册页 start    -->
    <div class="log_box" v-show="changeForget3">
      <el-collapse-transition>
        <div v-show="showLogin3">
          <div class="transition-box" v-bind:style="{ backgroundImage: bindBanner}">
            <div class="logIn_container">
              <div class="register_box">
                  <p class="rg_logIn" @click="rg_logIn" @mouseover="arrow_in" @mouseout="arrow_out"><img v-if="arrowChange" src="../../../images/index/arrow_grey.png" alt="img" style="margin-right: 10px;"><img v-else src="../../../images/index/arrow_blue.png" alt="img" style="margin-right: 10px;">登录</p>
                  <div>
                    <span>手机号：</span>
                    <input class="rg_mobilePhone" type="text" v-model="rg_mobilephone">
                    <transition name="shake">
                      <p v-show="rgPhone_alert" class="error">请输入正确的手机号!</p>
                    </transition>
                  </div>
                  <div>
                    <span>验证码：</span>
                    <input class="rg_rightCode" type="text" v-model="rg_code">
                    <button class="rg_getCode" @click="rg_hasYzm(fg_mobilephone)" v-if="rg_hYzm">{{rg_Yzm}}</button>
                    <button class="rg_getCode" style="background-color: #C8C8C8;" v-else disabled>{{rg_Yzm1}}</button>
<!--                     <p class="rg_getCode">获取验证码</p> -->
                    <transition name="shake">
                      <p v-show="rgCode_alert" class="error">请输入正确的验证码!</p>
                    </transition>
                  </div>
                  <div class="rg_pwd_box">
                    <span>密码：</span>
                    <input class="rg_pwd" type="password" v-model="rg_pwd">
                    <transition name="shake">
                      <p v-show="rgPwd_alert" class="error">请输入有效的密码! 密码长度需在6到16位之间</p>
                    </transition>
                  </div>
                  <div class="rg_confirmPwd_box">
                    <span>确认密码：</span>
                    <input class="rg_confirmPwd" type="password" v-model="rg_confirmPwd" @keyup.enter="rg_logIn">
                    <transition name="shake">
                      <p v-show="rgConfirmPwd_alert" class="error">设置密码与确认密码不一致!</p>
                    </transition>
                  </div>
                  <!-- <input type="text" id="code_input" value="" style="width: 100px;height:40px;"/>
                  <div id="v_container" style="width: 120px;height: 50px;margin-left:30px;margin-top:20px;display:inline-block;"></div> -->
                  
<!--                   <p class="rg_alrHave" @click="rg_alrHave">已有账号</p> -->
                  <div class="rg_confirm_btn" @click="rg_register">注册</div>
                  <div class="rg_choose_box">
                    <input type="checkbox" v-model="agree" class="checkYa" /><span class="rg_choose_word">我已阅读并同意<span class="publicHover col-blue" @click="serviceClause">牙医abc注册协议</span></span>
                  </div>
                  <transition name="shake">
                    <p class="rg_choose_error" v-show="rgAgree_alert">请先同意牙医abc注册协议!</p>
                  </transition>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <!--     注册页 end    -->
    <div class="headerSecond" v-show="Second">
      <img class="logo_img left" src="../../../images/index/logo.png" alt="img" @click="logo">
      <div class="search_box left">
        <input class="search_word" type="text" @keyup.enter="search_cargo" v-model="searchCargo" autocomplete="on">
        <img @click="search_cargo" class="search_img" src="../../../images/index/search.png" alt="img">
        <p class="search_p" @click="search_cargo">搜索</p>
        <div class="historySearch_box">
          <span class="historySearch" v-for="(item,index) in filteredHrecord" @click="search_cargo(item,index)">{{item}}</span>
        </div>
      </div>
      <img src="../../../images/index/first.png" style="float: left; margin-right: 60px;" alt="img">
      <img src="../../../images/index/second.png" style="float: left; margin-right: 60px;" alt="img">
      <img src="../../../images/index/third.png" style="float: left;" alt="img">
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  var crypto = require('crypto');
  import Bus from '../../global/bus.js'
//   !(function(window, document) {
//   function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
//     this.options = { //默认options参数值
//       id: "", //容器Id
//       canvasId: "verifyCanvas", //canvas的ID
//       width: "120", //默认canvas宽度
//       height: "50", //默认canvas高度
//       type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
//       code: ""
//     }
    
//     if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
//       for(var i in options) { //根据传入的参数，修改默认参数值
//         this.options[i] = options[i];
//       }
//     }else{
//       this.options.id = options;
//     }
    
//     this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
//     this.options.letterArr = getAllLetter();

//     this._init();
//     this.refresh();
//   }

//   GVerify.prototype = {
//     /**版本号**/
//     version: '1.0.0',
    
//     /**初始化方法**/
//     _init: function() {
//       var con = document.getElementById(this.options.id);
//       var canvas = document.createElement("canvas");
//       this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "120";
//       this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "40";
//       canvas.id = this.options.canvasId;
//       canvas.width = this.options.width;
//       canvas.height = this.options.height;
//       canvas.style.cursor = "pointer";
//       canvas.innerHTML = "您的浏览器版本不支持canvas";
//       con.appendChild(canvas);
//       var parent = this;
//       canvas.onclick = function(){
//         parent.refresh();
//       }
//     },
    
//     /**生成验证码**/
//     refresh: function() {
//       this.options.code = "";
//       var canvas = document.getElementById(this.options.canvasId);
//       if(canvas.getContext) {
//         var ctx = canvas.getContext('2d');
//       }else{
//         return;
//       }
      
//       ctx.textBaseline = "middle";

//       ctx.fillStyle = randomColor(180, 240);
//       ctx.fillRect(0, 0, this.options.width, this.options.height);

//       if(this.options.type == "blend") { //判断验证码类型
//         var txtArr = this.options.numArr.concat(this.options.letterArr);
//       } else if(this.options.type == "number") {
//         var txtArr = this.options.numArr;
//       } else {
//         var txtArr = this.options.letterArr;
//       }

//       for(var i = 1; i <= 4; i++) {
//         var txt = txtArr[randomNum(0, txtArr.length)];
//         this.options.code += txt;
//         ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
//         ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色    
//         ctx.shadowOffsetX = randomNum(-3, 3);
//         ctx.shadowOffsetY = randomNum(-3, 3);
//         ctx.shadowBlur = randomNum(-3, 3);
//         ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
//         var x = this.options.width / 5 * i;
//         var y = this.options.height / 2;
//         var deg = randomNum(-30, 30);
//         /**设置旋转角度和坐标原点**/
//         ctx.translate(x, y);
//         ctx.rotate(deg * Math.PI / 180);
//         ctx.fillText(txt, 0, 0);
//         /**恢复旋转角度和坐标原点**/
//         ctx.rotate(-deg * Math.PI / 180);
//         ctx.translate(-x, -y);
//       }
//       /**绘制干扰线**/
//       for(var i = 0; i < 4; i++) {
//         ctx.strokeStyle = randomColor(40, 180);
//         ctx.beginPath();
//         ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
//         ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
//         ctx.stroke();
//       }
//       /**绘制干扰点**/
//       for(var i = 0; i < this.options.width/4; i++) {
//         ctx.fillStyle = randomColor(0, 255);
//         ctx.beginPath();
//         ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
//         ctx.fill();
//       }
//     },
    
//     /**验证验证码**/
//     validate: function(code){
//       var code = code.toLowerCase();
//       var v_code = this.options.code.toLowerCase();
//       console.log(v_code);
//       if(code == v_code){
//         return true;
//       }else{
//         this.refresh();
//         return false;
//       }
//     }
//   }
//   /**生成字母数组**/
//   function getAllLetter() {
//     var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
//     return letterStr.split(",");
//   }
//   /**生成一个随机数**/
//   function randomNum(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
//   }
//   /**生成一个随机色**/
//   function randomColor(min, max) {
//     var r = randomNum(min, max);
//     var g = randomNum(min, max);
//     var b = randomNum(min, max);
//     return "rgb(" + r + "," + g + "," + b + ")";
//   }
//   window.GVerify = GVerify;
// })(window, document);
  export default {
    name: 'publicHeader',
    props:['msgFromGoodInfo','msgFromIndex'],
    data () {
      return {
        bindBanner: '',
        car_num: 0,
        arrowChange: true,
        hasLogin: true,
        username: '',
        changeForget1: false,
        changeForget2: false,
        changeForget3: false,
        showLogin1: false,
        showLogin2: false,
        showLogin3: false,
        cargo_show: false,
        ms_mobilephone: '',
        ms_yzm: '',
        pwd_mobilephone: '',
        pwd_pwd: '',
        fg_mobilephone: '',
        fg_code: '',
        fg_pwd: '',
        fg_confirmPwd: '',
        rg_mobilephone: '',
        rg_code: '',
        rg_pwd: '',
        rg_confirmPwd: '',
        isNum: false,
        changeLog1: false,
        changeLog2: true,
        isLog1: false,
        isLog2: true,
        agree: false,
        hYzm: true,
        fg_hYzm: true,
        rg_hYzm: true,
        Yzm1: '',
        Yzm: '获取验证码',
        fg_Yzm1: '',
        fg_Yzm: '获取验证码',
        rg_Yzm1: '',
        rg_Yzm: '获取验证码',
        items: [],
        msPhone_alert: false,
        msCode_alert: false,
        pwdPhone_alert: false,
        pwdpwd_alert: false,
        fgPhone_alert: false,
        fgCode_alert: false,
        fgPwd_alert: false,
        fgConfirmPwd_alert: false,
        rgPhone_alert: false,
        rgCode_alert: false,
        rgPwd_alert: false,
        rgConfirmPwd_alert: false,
        rgAgree_alert: false,
        Second: true,
        isActive: false,
        line: false,
        Gtoken: null,
        Hrecord: [],
        total_num: 0,
        total_price: 0,
        searchCargo: '',
        userHistory: [],
        activeInColor: '#333',
        activeOutColor: '#333',
        //activeColor: '#005aab'
      }
    },
    created: function() {
      var that = this;
      Bus.$on('getTarget', target => {
        if (target == 'addGoodNum') {
          var obj = {
            token:that.global.getToken()
          };
          that.global.axiosGetReq('/cart/list', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.car_num = res.data.data.length;
            } else {
              that.$message.error('登录过期，请重新登录！');
            }
          })
        }
      });
      if (that.msgFromIndex == 'RE_LOGIN') {
        that.global.removeMsg()
        that.hasLogin = true
        that.changeForget1 = true
        that.changeForget2 = false
        that.changeForget3 = false
        that.showLogin2 = false
        that.showLogin3 = false
        that.showLogin1 = true
        that.car_num = 0
        that.activeInColor = '#333333'
      }
      that.Gtoken = that.global.getToken();
      if (JSON.parse(that.global.getHistory()) == null) {
        that.Hrecord = []
      } else {
        that.Hrecord = JSON.parse(that.global.getHistory());
        that.Hrecord.reverse()
      }
      window.addEventListener('scroll', that.menu);
      if (that.global.getToken() !== null) {
        var username = that.global.getUser();
        that.username = username.phone;
        that.hasLogin = false;
      } else {
        that.hasLogin = true;
      }
      that.init();
      that.showCargo();
      // console.log(that.global.getToken());
    },
    // mounted(){
    //   var verifyCode = new GVerify("v_container");
    // },
    computed: {
      filteredHrecord: function () {
        return this.Hrecord.slice(0, 6)
      },
      filteredItems: function () {
        return this.items.slice(0, 5)
      }
    },
    watch: {
      // 登录变色
      showLogin1 : function() {
        var that = this;
        if (that.showLogin1 == true) {
          that.activeInColor = '#005aab'
        } else {
          that.activeInColor = '#333'
        }
      },
      // 注册变色
      showLogin3 : function() {
        var that = this;
        if (that.showLogin3 == true) {
          that.activeOutColor = '#005aab'
        } else {
          that.activeOutColor = '#333'
        }
      },
      msgFromGoodInfo() {
        var that = this;
        that.changeForget1 = true;
        that.changeForget2 = false;
        that.changeForget3 = false;
        that.showLogin1 = true;
      },
      //购物车
      Gtoken: function() {
        var that = this;
        if (that.Gtoken == null) {
          that.car_num = 0;
        } else {
          var obj = {
            token:that.global.getToken()
          };
          that.global.axiosGetReq('/cart/list', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.car_num = res.data.data.length;
            } else {
              that.$message.error('登录过期，请重新登录！');
            }
          })
        }
      },
      items: {
        handler: function() {
          var that = this;
        },
        deep: true
      },
      //监听短信登录手机号验证
      ms_mobilephone: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.ms_mobilephone !== '' && mb.test(that.ms_mobilephone)) {
          that.msPhone_alert = false;
        }
      },
      //监听短信登录验证码验证
      ms_yzm: function() {
        var that = this;
        if (that.ms_yzm !== '' && that.ms_yzm.length >= 6) {
          that.msCode_alert = false;
        }
      },
      //监听密码登录手机号验证
      pwd_mobilephone: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.pwd_mobilephone !== '' && mb.test(that.pwd_mobilephone)) {
          that.pwdPhone_alert = false;
        }
      },
      //监听密码登录密码验证
      pwd_pwd: function() {
        var that = this;
        if (that.pwd_pwd.length>5 && that.pwd_pwd.length<17 && that.pwd_pwd !== '') {
          that.pwdpwd_alert = false;
        }
      },
      //监听忘记密码手机号验证
      fg_mobilephone: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.fg_mobilephone !== '' && mb.test(that.fg_mobilephone)) {
          that.fgPhone_alert = false;
        }
      },
      //监听忘记密码验证码验证
      fg_code: function() {
        var that = this;
        if (that.fg_code !== '' && that.fg_code.length >= 6) {
          that.fgCode_alert = false;
        }
      },
      //监听忘记密码密码验证
      fg_pwd: function() {
        var that = this;
        if (that.fg_pwd.length>5 && that.fg_pwd.length<17 && that.fg_pwd !== '') {
          that.fgPwd_alert = false;
        }
      },
      //监听忘记密码确认密码验证
      fg_confirmPwd: function() {
        var that = this;
        if (that.fg_confirmPwd == that.fg_pwd && that.fg_confirmPwd !== '') {
          that.fgConfirmPwd_alert = false;
        }
      },
      //监听注册页手机号验证
      rg_mobilephone: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.rg_mobilephone !== '' && mb.test(that.rg_mobilephone)) {
          that.rgPhone_alert = false;
        }
      },
      //监听注册页验证码验证
      rg_code: function() {
        var that = this;
        if (that.rg_code !== '' && that.rg_code.length >= 6) {
          that.rgCode_alert = false;
        }
      },
      //监听注册页密码验证
      rg_pwd: function() {
        var that = this;
        if (that.rg_pwd.length>5 && that.rg_pwd.length<17 && that.rg_pwd !== '') {
          that.rgPwd_alert = false;
        }
      },
      //监听注册页确认密码验证
      rg_confirmPwd: function() {
        var that = this;
        if (that.rg_confirmPwd == that.rg_pwd && that.rg_confirmPwd !== '') {
          that.rgConfirmPwd_alert = false;
        }
      },
      //监听注册页同意条款验证
      agree: function() {
        var that = this;
        if (that.agree == true) {
          that.rgAgree_alert = false;
        }
      },
    },
    methods: {
      // 牙医ABC服务条款
      serviceClause: function() {
        var that = this;
        that.$router.push({path: '/protocols/aboutABC'})
      },
      //获取注册登录banner
      init: function() {
        var that = this;
        that.global.axiosGetReq('/adv/showAdv',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.bindBanner = 'url(' + res.data.data[0].advImg + ')';
          }else{
            that.$message.error('获取广告数据失败！');
          }
        })
      },
      menu: function() {
        var that = this;
        var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scroll > 60) {
          that.isActive = true;
        } else {
          that.isActive = false;
        }
        // console.log(scroll, 'frisco')
      },
      // 回到首页
      gotoIndex: function() {
        var that = this;
        that.$router.push({path: '/'});
      },
      // 创客系统入口
      gotoSales: function() {
        var that = this;
        window.open('/salesLog')
        //that.$router.push({path: '/salesLog'});
      },
      //绑定销售员入口
      salesEntry: function() {
        var that = this;
        if (that.global.getToken() !== null) {
          that.$router.push({ name: '个人资料', params: {currentView: 'tab04'}});
          // this.$router.push({path: '/center/personalData'});
        } else {
          that.changeForget1 = true;
          that.changeForget2 = false;
          that.changeForget3 = false;
          that.showLogin1 = true;
        }
      },
      //乾币充值
      qbCharge: function() {
        var that = this;
        if (that.global.getToken() !== null) {
          that.$router.push({path: '/center/myMoney'});
        } else {
          that.changeForget1 = true;
          that.changeForget2 = false;
          that.changeForget3 = false;
          that.showLogin1 = true;
        }
      },
      //首页搜索框
      search_cargo: function(item,index) {
        var that = this;
        if (typeof(item) !== 'object') {
          that.searchCargo = item
        }
        if (that.searchCargo == '') {
          that.$message.error('请输入查询条件！');
          return false
        }
        var obj = {
          keyWord: that.searchCargo,
        }
        that.global.axiosPostReq('/item/itemSearch', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length !== 0) {
              if (JSON.parse(that.global.getHistory()) == null) {
                that.userHistory = []
                that.userHistory.push(that.searchCargo)
              } else {
                that.userHistory = JSON.parse(that.global.getHistory())
                that.userHistory.push(that.searchCargo)
                var userHistoryData = []
                for (var i = 0; i < that.userHistory.length; i++) {
                  if (userHistoryData.indexOf(that.userHistory[i]) == -1) {
                    userHistoryData.push(that.userHistory[i])
                  }
                }
                that.userHistory = userHistoryData
                // console.log(that.userHistory,'9999')
              }
              that.global.setHistory(that.userHistory)
            }
            if (that.$router.history.current.name !== 'brandLib') {
              var data1 = res.data.data;
              data1.numberPerPage = res.data.numberPerPage;
              data1.totalNumber = res.data.totalNumber;
              data1.totalPage = res.data.totalPage;
              var search_word = that.searchCargo;
              that.$router.push({ name: 'brandLib', params: { classifyIdAndbrandId: '0-0-0AND0', data: data1, word: search_word}});
              window.scroll(0,0);
            } else {
              var data2 = res.data.data;
              data2.numberPerPage = res.data.numberPerPage;
              data2.totalNumber = res.data.totalNumber;
              data2.totalPage = res.data.totalPage;
              var search_word2 = that.searchCargo;
              data2.push(search_word2);
              that.$emit('listenToBrand', data2);
              window.scroll(0,0);
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 去商品详情
      gotoDetails: function(item) {
        var that = this;
        that.$router.push({path: '/details/' + item.itemId})
        that.$router.go(0);
        window.scroll(0,0);
      },
      // 去购物车
      gotocar: function() {
        var that = this;
        if (that.global.getToken() !== null) {
          that.$router.push({ path: '/gwc' });
        } else {
          that.changeForget1 = true;
          that.changeForget2 = false;
          that.changeForget3 = false;
          that.showLogin1 = true;
        }
      },
      // hover购物车
      showCargo: function() {
        var that = this;
        if (that.global.getToken() == null) {
          that.cargo_show = false;
          return false
        }
        var obj = {
          phone:that.global.getUser().phone,
          token:that.global.getToken()
        };
        that.global.axiosGetReq('/cart/list', obj).then((res) => {
          if(res.data.errorCode === 'RE_LOGIN'){
            that.$router.push({name:'index', params: { data: 'RE_LOGIN'}})
            that.global.removeMsg()
            that.hasLogin = true
            that.changeForget1 = true
            that.changeForget2 = false
            that.changeForget3 = false
            that.showLogin2 = false
            that.showLogin3 = false
            that.showLogin1 = true
            that.car_num = 0
            that.activeInColor = '#333333'
            that.$message({
              showClose: true,
              message: '登录过期，请重新登录！',
              type: 'error'
            });
            return false;
          }
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length == 0) {
              that.cargo_show = false;
              that.car_num = res.data.data.length;
              return false
            }
            if (res.data.data.length !== 0) {
              var sum = 0;
              var sumPrice = 0;
              that.cargo_show = true;
              that.items = res.data.data;
              that.car_num = res.data.data.length;
              for (var i = 0; i < that.items.length; i++) {
                sum += that.items[i].num
                sumPrice += that.items[i].num*that.items[i].price
              }
              that.total_num = sum;
              that.total_price = sumPrice;
              // console.log(res.data.data,'ppppp');
              return false
            }
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 删除购物车商品
      delete_cargo: function(item) {
        var that = this;
        var obj = {
          phone: that.global.getUser().phone,
          itemSKU: item.itemSKU,
          token: that.global.getToken()
        };
        that.global.axiosPostReq('/cart/delete', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.global.axiosGetReq('/cart/list', obj).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                if (res.data.data.length == 0) {
                  that.cargo_show = false;
                  that.car_num = res.data.data.length;
                  return false
                }
                if (res.data.data.length !== 0) {
                  var sum = 0;
                  var sumPrice = 0;
                  that.cargo_show = true;
                  that.items = res.data.data;
                  that.car_num = res.data.data.length;
                  for (var i = 0; i < that.items.length; i++) {
                    sum += that.items[i].num
                    sumPrice += that.items[i].num*that.items[i].price
                  }
                  that.total_num = sum;
                  that.total_price = sumPrice;
                  return false
                }
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
            that.$message({
              message: '删除成功！',
              type: 'success'
            });
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // logo跳转
      logo: function() {
        var that = this;
        that.$router.push({ path: '/index' });
      },
      // 我的订单
      myOrder: function() {
        var that = this;
        if (that.global.getToken() !== null) {
          that.$router.push({ name: '我的订单', params: {currentView: 'tab01'}});
        } else {
          that.changeForget1 = true;
          that.changeForget2 = false;
          that.changeForget3 = false;
          that.showLogin1 = true;
        }
      },
      // 登录成功后
      alreadyLog: function() {
        var that = this;
        that.$router.push({ name: '个人资料', params: {currentView: 'tab0401'}});
      },
      // 登出
      logOut: function() {
        var that = this;
        var obj = {
          token: that.global.getToken()
        }
        that.global.axiosPostReq('/user/reLogin', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.$router.push({ path: '/'})
            that.global.removeMsg()
            that.$message({
              message: '退出成功！',
              type: 'success'
            });
            that.hasLogin = true;
            that.car_num = 0;
            that.activeInColor = '#333333'
          } else {
            that.$message.error('退出失败！');
          }
        })
      },
      // 箭头变色
      arrow_in: function() {
        var that = this;
        that.arrowChange = false;
      },
      arrow_out: function() {
        var that = this;
        that.arrowChange = true;
      },
      // 页头点击登录按钮
      logIn: function() {
        var that = this;
        that.changeForget1 = true;
        that.changeForget2 = false;
        that.changeForget3 = false;
        that.showLogin2 = false;
        that.showLogin3 = false;
        that.showLogin1 = !that.showLogin1;
        // that.msgFromGoodInfo = ''
      },
      // 页头点击注册按钮
      register: function() {
        var that = this;
        that.changeForget1 = false;
        that.changeForget2 = false;
        that.changeForget3 = true;
        that.showLogin1 = false;
        that.showLogin2 = false;
        that.showLogin3 = !that.showLogin3;
      },
      // 短信登录tab切换
      messageLog: function() {
        var that = this;
        that.changeLog1 = true;
        that.changeLog2 = false;
        that.isLog1 = true;
        that.isLog2 = false;
      },
      // 密码登录tab切换
      pwdLog: function() {
        var that = this;
        that.changeLog1 = false;
        that.changeLog2 = true;
        that.isLog1 = false;
        that.isLog2 = true;
      },
      // 忘记密码按钮
      forgetPwd: function() {
        var that = this;
        that.changeForget1 = false;
        that.changeForget2 = true;
        that.changeForget3 = false;
        that.showLogin1 = false;
        that.showLogin2 = true;
        that.showLogin3 = false;
      },
      // 已有账号按钮
      fg_alrHave: function() {
        var that = this;
        that.changeForget1 = true;
        that.changeForget2 = false;
        that.changeForget3 = false;
        that.showLogin1 = true;
        that.showLogin2 = false;
        that.showLogin3 = false;
      },
      // 右上角注册按钮
      ms_register: function() {
        var that = this;
        that.changeForget1 = false;
        that.changeForget2 = false;
        that.changeForget3 = true;
        that.showLogin1 = false;
        that.showLogin2 = false;
        that.showLogin3 = true;
      },
      // 右上角登录按钮
      rg_logIn: function() {
        var that = this;
        that.changeForget1 = true;
        that.changeForget2 = false;
        that.changeForget3 = false;
        that.showLogin1 = true;
        that.showLogin2 = false;
        that.showLogin3 = false;
      },
      // 获取验证码
      hasYzm: function(ms_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.ms_mobilephone == '' || !mb.test(that.ms_mobilephone)) {
          that.msPhone_alert = true
          return false
        } else {
          var obj = { phone: that.ms_mobilephone }
          that.global.axiosPostReq('/user/getVerifyCode', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              for(let  i=0; i<=60; i++) {
                window.setTimeout(function(){
                  if (sec != 0) {
                    that.hYzm = false;
                    that.Yzm1 =   sec + "秒后重发验证" ;
                    sec--;
                  } else {
                    sec = 60;//如果倒计时结束就让  获取验证码显示出来
                    that.hYzm = true;
                    that.Yzm = '获取验证码';
                  }
                }, i * 1000)
              }
            } else {
              that.$message.error('获取验证码失败！');
            }
          })
        }
      },
      fg_hasYzm: function(fg_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.fg_mobilephone == '' || !mb.test(that.fg_mobilephone)) {
          that.fgPhone_alert = true
        } else {
          var obj = { phone: that.fg_mobilephone }
          that.global.axiosPostReq('/user/getVerifyCode', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              for(let  i=0; i<=60; i++) {
                window.setTimeout(function(){
                  if (sec != 0) {
                    that.fg_hYzm = false;
                    that.fg_Yzm1 =   sec + "秒后重发验证" ;
                    sec--;
                  } else {
                    sec = 60;//如果倒计时结束就让  获取验证码显示出来
                    that.fg_hYzm = true;
                    that.fg_Yzm = '获取验证码';
                  }
                }, i * 1000)
              }
            } else {
              that.$message.error('获取验证码失败！');
            }
          })
       }
      },
      rg_hasYzm: function(rg_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.rg_mobilephone == '' || !mb.test(that.rg_mobilephone)) {
          that.rgPhone_alert = true
        } else {
          var obj = { phone: that.rg_mobilephone }
          that.global.axiosPostReq('/user/getVerifyCode', obj)
          .then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              for(let  i=0; i<=60; i++) {
                window.setTimeout(function(){
                  if (sec != 0) {
                    that.rg_hYzm = false;
                    that.rg_Yzm1 =   sec + "秒后重发验证" ;
                    sec--;
                  } else {
                    sec = 60;//如果倒计时结束就让  获取验证码显示出来
                    that.rg_hYzm = true;
                    that.rg_Yzm = '获取验证码';
                  }
                }, i * 1000)
              }
            } else {
              that.$message.error('获取验证码失败！');
            }
          })
        }
      },
      // 短信登录btn
      ms_logIn: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!mb.test(that.ms_mobilephone) || that.ms_mobilephone == '') {
          that.msPhone_alert = true;
          return false
        }
        if(that.ms_yzm == '' || that.ms_yzm.length < 4) {
          that.msCode_alert = true;
          return false
        }
        var obj = {
          phone: that.ms_mobilephone,
          code: that.ms_yzm,
        }
        that.global.axiosPostReq('/user/noteLogin', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.global.setToken(res.data.token)
            that.global.setUser(res.data.data)
            that.$message({
              message: '登录成功！',
              type: 'success'
            });
            that.Gtoken = that.global.getToken();
            that.username = res.data.data.phone;
            that.hasLogin = false;
            that.changeForget1 = false;
            that.changeForget2 = false;
            that.changeForget3 = false;
            that.ms_mobilephone = '';
            that.ms_yzm = '';
            return false
          } else {
            that.$message.error(res.data.msg);
          }
        })
      },
      // 密码登录btn
      pwd_logIn: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!mb.test(that.pwd_mobilephone) || that.pwd_mobilephone == '') {
          that.pwdPhone_alert = true;
          return false
        }
        if(that.pwd_pwd.length<6 || that.pwd_pwd.length>16 || that.pwd_pwd== '') {
          that.pwdpwd_alert = true;
          return false
        }
        var md5sum = crypto.createHash('md5');
        md5sum.update(that.pwd_pwd);
        var str = md5sum.digest('hex');
        var obj = {
          phone: that.pwd_mobilephone,
          password: str,
        }
        that.global.axiosPostReq('/user/pwdLogin', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            // console.log(res,"查看token");
            that.global.setToken(res.data.token)
            that.global.setUser(res.data.data)
            that.$message({
              message: '登录成功！',
              type: 'success'
            });
            that.Gtoken = that.global.getToken();
            that.username = res.data.data.phone;
            that.hasLogin = false;
            that.changeForget1 = false;
            that.changeForget2 = false;
            that.changeForget3 = false;
            that.pwd_mobilephone = '';
            that.pwd_pwd = '';
          } else {
            that.$message.error(res.data.msg);
          }
        })
      },
      // 忘记密码确认btn
      fg_confirm: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!mb.test(that.fg_mobilephone) || that.fg_mobilephone == '') {
          that.fgPhone_alert = true;
          return false
        }
        if(that.fg_code == '' || that.fg_code.length < 4) {
          that.fgCode_alert = true;
          return false
        }
        if(that.fg_pwd.length<6 || that.fg_pwd.length>16 || that.fg_pwd== '') {
          that.fgPwd_alert = true;
          return false
        }
        if(that.fg_confirmPwd !== that.fg_pwd || that.fg_confirmPwd == '') {
          that.fgConfirmPwd_alert = true;
          return false
        }
        var md5sum = crypto.createHash('md5');
        md5sum.update(that.fg_pwd);
        var str = md5sum.digest('hex');
        var obj = {
          phone: that.fg_mobilephone,
          password: str,
          code: that.fg_code,
        }
        that.global.axiosPostReq('/user/forgetPwd', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.changeForget1 = true;
            that.changeForget2 = false;
            that.changeForget3 = false;
            that.showLogin1 = true;
            that.showLogin2 = false;
            that.showLogin3 = false;
            that.fg_mobilephone = '';
            that.fg_pwd = '';
            that.fg_code = '';
            that.fg_confirmPwd = '';
            that.pwd_mobilephone = '';
            that.pwd_pwd = '';
            that.$message({
              message: '重设密码成功！',
              type: 'success'
            });
          } else {
            that.$message.error(res.data.msg);
          }
        })
      },
      // 注册页注册btn
      rg_register: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!mb.test(that.rg_mobilephone) || that.rg_mobilephone == '') {
          that.rgPhone_alert = true;
          return false
        }
        if(that.rg_code == '' || that.rg_code.length < 4) {
          that.rgCode_alert = true;
          return false
        }
        if(that.rg_pwd.length<6 || that.rg_pwd.length>16 || that.rg_pwd== '') {
          that.rgPwd_alert = true;
          return false
        }
        if(that.rg_confirmPwd !== that.rg_pwd || that.rg_confirmPwd == '') {
          that.rgConfirmPwd_alert = true;
          return false
        }
        if(that.agree == false) {
          that.rgAgree_alert = true;
          return false
        }
        var md5sum = crypto.createHash('md5');
        md5sum.update(that.rg_pwd);
        var str = md5sum.digest('hex');
        var obj = {
          phone: that.rg_mobilephone,
          password: str,
          code: that.rg_code,
        }
        that.global.axiosPostReq('/user/register', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.global.setToken(res.data.token)
            that.global.setUser(res.data.data)
            that.$message({
              message: '注册成功！牙医abc送您60乾币！',
              type: 'success'
            });
            that.Gtoken = that.global.getToken();
            that.username = res.data.data.phone;
            that.hasLogin = false;
            that.changeForget1 = false;
            that.changeForget2 = false;
            that.changeForget3 = false;
            that.pwd_mobilephone = '';
            that.pwd_pwd = '';
            that.rg_mobilephone = '';
            that.rg_pwd = '';
            that.rg_code = '';
            that.rg_confirmPwd = '';
            that.agree = false;
          } else {
            that.$message.error(res.data.msg);
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col-blue{
    color: #005aab;
  }
  input {
    border: 1px solid #e9e9e9;
    outline:medium;
    font-size: 15px;
    padding: 0 7px 0 7px;
  }
  input:focus {
    border: 1px solid #e9e9e9;
  }
  .publicHeader {
    position: relative;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .error {
    position: absolute;
    left: 90px;
    font-size: 12px;
    color: #cb1700;
  }
  .speH {
    width: 100%;
    position: fixed;
    top: 0;
/*    right: 0;
    left: 0;*/
/*    margin: auto;*/
    background-color: #fff;
  }
  .spe {
/*    z-index: -5 !important;*/
  }
  .headerBox {
    width: 100%;
    height: 28px;
    border-bottom: 1px #eee solid;
    box-shadow: 1px 1px 5px #eee;
    margin-bottom: 30px;
    z-index: 100;
  }
  .headerFirst {
    width: 1200px;
    height: 28px;
    line-height: 28px;
    margin: 0 auto;
    margin-bottom: 22px;
    font-size: 12px;
    color: #000;
    z-index: 1000;
  }
  .log {
    margin-left: 40px;
    position: relative;
  }
  .my_order {
    margin-left: 35px;
  }
  .shopping_car {
    width: 80px;
    height: 26px;
    position: relative;
    cursor: pointer;
    border: 1px solid #fff;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 35px;
    z-index: 1000;
  }
  .shopping_car .car_img {
    position: absolute;
    top: 4px;
    left: 3px;
  }
  .shopping_car .car_num {
    color: #cb1700;
    margin-left: 10px;
  }
  .gwcHeader {
    margin-left: 27px;
    width: 71px;
    z-index: 1000;
  }
  .logIn:hover, .register:hover, .my_order:hover, .yayi:hover, .system_enter:hover{
    color: #005aab;
    cursor: pointer;
    transition: all ease 0.5s;
  }
  .log_box, .log_box2{
    width: 100%;
/*    height: 600px;*/
    z-index: 999;
    position: fixed;
    top: 28px;
  }
  .yayi {
    margin-left: 40px;
  }
  .yayi:hover {
    color: #005aab;
    cursor: pointer;
    transition: all ease 0.5s;
  }
/*------------页面购物车hover样式 start----------------*/
  .whiteLine {
    display: block;
    position: absolute;
    top: 27px;
    left: 90px;
    width: 288px;
    height: 1px;
    background-color: #e9e9e9;
    z-index: 9999;
  }
  .elseLine {
    display: none;
    position: absolute;
    top: 26px;
    left: 90px;
    width: 259px;
    height: 1px;
    background-color: #e9e9e9;
    z-index: 9999;
  }
  .shopping_car:hover .whiteLine{
    display: block;
  }
  .shopping_car:hover .elseLine{
    display: block;
  }
  .shopping_car:hover {
    border-top: 1px solid #e9e9e9;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
  }
  .shopping_car:hover .car_hover{
    display: block;
  }
  .shopping_car:hover .car_hover1{
    display: block;
  }
  .shopping_car .car_hover {
    display: none;
    width: 337px;
/*    max-height: 500px;*/
/*    overflow-x: hidden;*/
/*    overflow-y: scroll;*/
    position: absolute;
    top: 27px;
    left: -1px;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    padding: 20px 20px 10px 20px;
    background-color: #fff;
    z-index: 999;
  }
  .shopping_car .car_hover1 {
    display: none;
    width: 308px;
    position: absolute;
    text-align: center;
    top: 27px;
    left: -1px;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    padding: 20px;
    background-color: #fff;
    z-index: 999;
  }
  .cargo_title {
    font-size: 12px;
    font-weight: bold;
    color: #000;
/*    margin-top: 12px;*/
  }
  .cargo_box {
    width: 317px;
    height: 70px;
    margin-top: 12px;
    position: relative;
    border-bottom: 1px solid #e9e9e9;
  }
/*  .cargo_box:hover {
    background-color: #e9e9e9;
    transition: all ease 0.5s
  }*/
  .cargo_sm {
    margin-top: 10px;
    border: 1px solid #e9e9e9;
    width: 45px;
    height: 45px;
  }
  .cargo_des {
    position: absolute;
    top: 3px;
    left: 70px;
    width: 200px;
    height: 28px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .cargo_price {
    position: absolute;
    top: 3px;
    right: 0px;
    color: #cb1700;
  }
  .cargo_num {
    position: absolute;
    top: 30px;
    left: 70px;
    width: 200px;
    height: 28px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .cargo_rm {
    position: absolute;
    top: 30px;
    right: 0px;
    color: #999;
  }
  .cargo_rm:hover {
    color: #329af0;
    transition: all ease 0.5s;
  }
  .total_box {
    width: 100%;
    height: 100%;
    color: #000;
  }
  .fir {
    font-weight: bold;
    margin-top: 10px;
    margin-right: 20px;
    color: #000;
  }
  .sec {
    font-weight: bold;
    margin-top: 10px;
    color: #000;
  }
  .gotocar {
    width: 70px;
    height: 30px;
    line-height: 30px;
    background-color: #005aab;
    text-align: center;
    border-radius: 6px;
    margin-top: 13px;
    color: #fff;
  }
/*------------页面购物车hover样式 end----------------*/
/*-------------------短信密码登录 start----------------------*/
  .transition-box {
    width: 100%;
    height: 398px;
    background-repeat: no-repeat;
    background-position: center;
/*    background: url(../../../images/index/logBg.jpg) center no-repeat;*/
    text-align: center;
    box-shadow: 0 6px 5px -2px #999999;
/*    box-shadow: 0px 1px 0px #999999;*/
  }
  .transition-box .logIn_container {
    width: 1200px;
    height: 398px;
    margin: 0 auto;
    position: relative;
/*    background-color: #EECE7C;*/
  }
  .transition-box .logIn_container .logIn_box {
    width: 432px;
    height: 361px;
    padding: 10px 10px 0 10px;
    position: absolute;
    top: 14px;
    right: 0px;
    background-color: #fff;
    box-shadow: 7px 7px 28px #778899;
    font-size: 14px;
    color: #333;
  }
  .ms_register {
    text-align: right;
    margin-bottom: 5px;
  }
  .ms_register:hover {
    color: #005aab;
    cursor: pointer;
/*    transition: all ease 0.5s;
*/  }
  .logIn_header {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e9e9e9;
  }
  .messageLog {
    width: 104px;
    height: 35px;
    line-height: 25px;
    font-size: 16px;
    float: left;
    text-align: center;
    margin-right: 20px;
    padding-bottom: 8px;
  }
  .speBottom {
    color: #005aab;
    border-bottom: 3px solid #005aab;
  }
  .pwdLog {
    width: 104px;
    height: 35px;
    line-height: 25px;
    font-size: 16px;
    float: left;
    text-align: center;
    padding-bottom: 8px;
  }
  .messageLog:hover, .pwdLog:hover{
    cursor: pointer;
    color: #005aab;
    transition: all ease 0.5s;
  }
  .des_box {
    width: 100%;
/*    height: 280px;*/
    margin-top: 2px;
  }
  .mobilePhone {
    width: 315px;
    height: 39px;
    margin-top: 30px;
  }
  .rightCode {
    width: 170px;
    height: 39px;
    margin-top: 30px;
    margin-right: 10px;
  }
  .pwd_box {
    margin-left: 11px;
  }
  .pwd {
    width: 315px;
    height: 39px;
    margin-top: 30px;
  }
  .getCode {
    display: inline-block;
    width: 130px;
    height: 41px;
    line-height: 40px;
    background-color: #005aab;
    color: #fff;
/*    background-color: #EBEBEB;*/
    text-align: center;
    transform: translateY(-5%);
  }
  .getCode:hover {
    cursor: pointer;
    background-color: #329af0;
    transition: all ease 0.5s;
  }
  .logIn_btn {
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;
    background-color: #005aab;
    color: #fff;
  }
  .logIn_btn:hover {
    cursor: pointer;
    background-color: #329af0;
    transition: all ease 0.5s;
  }
  .logIn_btn2 {
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    background-color: #005aab;
    color: #fff;
  }
  .logIn_btn2:hover {
    cursor: pointer;
    background-color: #329af0;
    transition: all ease 0.5s;
  }
  .logIn_error {
    font-size: 12px;
    color: #cb1700;
    margin-top: 5px;
  }
  .forgetPwd {
    margin-top: 20px;
    margin-right: 20px;
    text-align: right;
  }
  .forgetPwd:hover {
    cursor: pointer;
    color: #005aab;
    transition: all ease 0.5s;
  }
/*-------------------短信密码登录 end----------------------*/
/*-------------------忘记密码 strat----------------------*/
  .forgetPwd_box {
    width: 432px;
    height: 361px;
    padding: 10px 10px 0 10px;
    position: absolute;
    top: 14px;
    right: 0px;
    background-color: #fff;
    box-shadow: 7px 7px 28px #778899;
    font-size: 14px;
    color: #333;
  }
  .fg_mobilePhone {
    width: 315px;
    height: 39px;
    margin-top: 30px;
  }
  .fg_rightCode {
    width: 170px;
    height: 39px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .fg_getCode {
    display: inline-block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    background-color: #005aab;
    color: #fff;
    text-align: center;
  }
  .fg_pwd_box {
    margin-left: 11px;
  }
  .fg_pwd {
    width: 315px;
    height: 39px;
    margin-top: 16px;
  }
  .fg_confirmPwd {
    width: 315px;
    height: 39px;
    margin-top: 16px;
  }
  .fg_confirmPwd_box {
    margin-right: 15px;
  }
  .fg_confirm_btn {
    width: 250px;
    height: 40px;
    margin: 0 auto;
    margin-top: 25px;
    line-height: 40px;
    text-align: center;
    background-color: #005aab;
    color: #fff;
  }
  .fg_alrHave {
    margin-right: 20px;
    margin-top: 5px;
    text-align: right;
  }
  .fg_alrHave:hover {
    cursor: pointer;
    color: #005aab;
    transition: all ease 0.5s;
  }
  .fg_confirm_btn:hover {
    cursor: pointer;
    background-color: #329af0;
    transition: all ease 0.5s;
  }
/*-------------------忘记密码 end----------------------*/
/*-------------------注册页 statt----------------------*/
  .register_box {
    width: 432px;
    height: 361px;
    padding: 10px 10px 0 10px;
    position: absolute;
    top: 14px;
    right: 0px;
    background-color: #fff;
    box-shadow: 7px 7px 28px #778899;
    font-size: 14px;
    color: #333;
  }
  .rg_mobilePhone {
    width: 315px;
    height: 39px;
    margin-top: 10px;
  }
  .rg_rightCode {
    width: 170px;
    height: 39px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .rg_getCode {
    display: inline-block;
    width: 130px;
    height: 41px;
    line-height: 41px;
    background-color: #005aab;
    color: #fff;
    text-align: center;
    transform: translateY(-1px);
  }
  .rg_getCode:hover {
    cursor: pointer;
    background-color: #329af0;
    transition: all ease 0.5s;
  }
  .rg_pwd_box {
    margin-left: 11px;
  }
  .rg_pwd {
    width: 315px;
    height: 39px;
    margin-top: 16px;
  }
  .rg_confirmPwd {
    width: 315px;
    height: 39px;
    margin-top: 16px;
  }
  .rg_confirmPwd_box {
    margin-right: 15px;
  }
  .rg_confirm_btn {
    width: 250px;
    height: 40px;
    margin: 0 auto;
    margin-top: 26px;
    line-height: 40px;
    text-align: center;
    background-color: #005aab;
    color: #fff;
  }
  .rg_confirm_btn:hover {
    cursor: pointer;
    background-color: #329af0;
    transition: all ease 0.5s;
  }
  .rg_alrHave {
    margin-right: 55px;
    margin-top: 5px;
    text-align: right;
  }
  .rg_alrHave:hover {
    cursor: pointer;
    color: #005aab;
    transition: all ease 0.5s;
  }
  .rg_logIn {
    text-align: right;
  }
  .rg_logIn:hover {
    color: #005aab;
    cursor: pointer;
/*    transition: all ease 0.5s;*/
  }
  .alreadyLog:hover {
    color: #005aab;
    cursor: pointer;
    transition: all ease 0.5s;
  }
  .logOut {
    color: #000;
    font-size: 12px;
    margin-left: 40px;
    float: right;
    transform: translateY(-5%);
  }
  .logOut:hover, .qbCharge:hover{
    color: #005aab;
    cursor: pointer;
    transition: all ease 0.5s;
  }
  .rg_choose_box {
    margin-top: 10px;
    font-size: 12px;
    position: relative;
  }
  .checkYa {
    position: relative;
    transform: translateY(2px);
  }
  .rg_choose_word {
    margin-left: 5px;
    font-size: 12px;
  }
  .rg_choose_error {
    font-size: 12px;
    color: #cb1700;
    margin-top: 2px;
  }
/*-------------------注册页 end----------------------*/
  .headerSecond {
    width: 1200px;
    height: 63px;
    margin: 0 auto;
    margin-bottom: 25px;
/*    background-color: #EECE7C;*/
  }
  .headerSecond .search_box {
    margin-top: 3px;
    margin-right: 80px;
    position: relative;
  }
  .headerSecond .search_word {
    width: 420px;
    height: 33px;
    border: 1px solid #005aab;
    outline: medium;
    padding-left: 45px;
  }
  .headerSecond .search_word:focus {
    border: 1px solid #005aab !important;
/*    transition: all linear 0.2s;*/
  }
  .headerSecond .search_img {
    position: absolute;
    top: 5px;
    left: 10px;
  }
  .search_img:hover {
    cursor: pointer;
  }
  .headerSecond .logo_img {
    margin-right: 80px;
  }
  .headerSecond .logo_img:hover {
    cursor: pointer;
  }
  .search_p {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 60px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    background-color: #005aab;
    text-align: center;
    color: #fff;
  }
  .search_p:hover {
    cursor: pointer;
    box-shadow: 0px 0px 7px #005aab;
    transition: all 0.5s ease;
  }
  .historySearch_box {
    margin-top: 10px;
    position: absolute;
    top: 34px;
    font-size: 12px;
  }
  .historySearch {
    font-size: 12px;
    color: #999;
    margin-right: 10px;
  }
  .historySearch:hover {
    cursor: pointer;
    color: #329af0;
    transition: all ease 0.5s;
  }
  .giveQb_word {
    display: inline-block;
    font-size: 12px;
    color: #cb1700;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.85);
    transform: scale(0.85);
  }
</style>
