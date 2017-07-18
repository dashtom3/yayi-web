<template>
  <div class="publicHeader">
    <div class="headerBox" :class="{ speH: isActive }">
      <div class="headerFirst">
        <div class="system_enter left" @click="gotoIndex">首页</div>
        <div class="left" style="margin-left:60px;cursor:pointer;" @click="salesEntry">绑定销售员入口</div>
        <div class="yayi left" @click="gotoSales">创客系统入口</div>
        <div v-if="hasLogin" class="log right">
          <span class="logIn" @click="logIn">登录</span>/<span class="register" @click="register">注册</span>
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
            <div class="cargo_box" v-for="item in items" :key="item" @click="gotoDetails(item)">
              <img class="cargo_sm" :src=item.pic alt="img">
              <div class="cargo_des">{{item.name}}</div>
              <div class="cargo_price">￥{{item.price}}*{{item.num}}</div>
              <div class="cargo_num">
                <span v-if="item.itemPropertyInfo">{{item.itemPropertyInfo}}</span>
                <span v-if="item.itemPropertyTwoValue">{{';'+item.itemPropertyTwoValue}}</span>
                <span v-if="item.itemPropertyThreeValue">{{';'+item.itemPropertyThreeValue}}</span>
                <span v-if="item.itemPropertyFourValue">{{';'+item.itemPropertyFourValue}}</span>
                <span v-if="item.itemPropertyFiveValue">{{';'+item.itemPropertyFiveValue}}</span>
                <span v-if="item.itemPropertySixValue">{{';'+item.itemPropertySixValue}}</span>
              </div>
              <div class="cargo_rm" @click.stop="delete_cargo(item)">删除</div>
            </div>
            <div class="total_box">
              <p class="fir left">共<span style="color: #D81E06;">{{car_num}}</span>件商品</p>
              <p class="sec left">总计: <span style="color: #D81E06;">￥{{total_price}}</span></p>
              <div class="gotocar right" @click="gotocar">去购物车</div>
            </div>
          </div>
          <div class="car_hover1" v-else>
            暂无选购商品
          </div>
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
                  <div class="messageLog" :class="{ speBottom: isLog1}" @click="messageLog">短信登录</div>
                  <div class="pwdLog" :class="{ speBottom: isLog2}" @click="pwdLog">密码登录</div>
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
<!--                   <p class="rg_alrHave" @click="rg_alrHave">已有账号</p> -->
                  <div class="rg_confirm_btn" @click="rg_register">注册</div>
                  <div class="rg_choose_box">
                    <input type="checkbox" v-model="agree" class="checkYa" /><span class="rg_choose_word">我已阅读并同意牙医ABC服务条款</span>
                  </div>
                  <transition name="shake">
                    <p class="rg_choose_error" v-show="rgAgree_alert">请先同意牙医ABC服务条款!</p>
                  </transition>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <!--     注册页 end    -->
    <div class="headerSecond" v-show="Second">
      <img class="logo_img" src="../../../images/index/logo.png" alt="img" @click="logo">
      <div class="search_box right">
        <input class="search_word" type="text" @keyup.enter="search_cargo" v-model="searchCargo" autocomplete="on">
        <img @click="search_cargo" class="search_img" src="../../../images/index/search.png" alt="img">
        <p class="search_p" @click="search_cargo">搜索</p>
        <p>
          <span class="historySearch" v-for="item in filteredHrecord" @click="search_cargo(item)">{{item.word}} </span>
        </p>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  var crypto = require('crypto');
  export default {
    name: 'publicHeader',
    props:['msgFromGoodInfo'],
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
        changeLog1: true,
        changeLog2: false,
        isLog1: true,
        isLog2: false,
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
      }
    },
    //*******导航钩子*********//
    // beforeRouteEnter (to, from, next) {
    //   // 通过 `vm` 访问组件实例
    //   next(vm => {
    //     var that = vm;
    //     var token = window.localStorage.getItem('Token');
    //     console.log(token);
    //   })
    // },
    created: function() {
      var that = this;
      that.Gtoken = that.global.getToken();
      if (JSON.parse(that.global.getHistory()) == null) {
        that.Hrecord = []
      } else {
        that.Hrecord = JSON.parse(that.global.getHistory());
        that.Hrecord.reverse()
      }
      // console.log(that.Hrecord,'ooooo')
      window.addEventListener('scroll', that.menu);
      if (that.global.getToken() !== null) {
        var username = that.global.getUser();
        that.username = username.phone;
        that.hasLogin = false;
      } else {
        that.hasLogin = true;
      }
      that.init();
      // console.log(that.global.getToken());
    },
    computed: {
      filteredHrecord: function () {
        return this.Hrecord.slice(0, 6)
      }
    },
    watch: {
      msgFromGoodInfo() {
        var that = this;
        // if (that.msgFromGoodInfo == 'sayToLogin') {
          // that.changeForget1 = true;
          // that.changeForget2 = false;
          // that.changeForget3 = false;
          // that.showLogin2 = false;
          // that.showLogin3 = false;
          // that.showLogin1 = !that.showLogin1;

          that.changeForget1 = true;
          that.changeForget2 = false;
          that.changeForget3 = false;
          that.showLogin1 = true;
          // that.msgFromGoodInfo = "";
        // }
        // console.log(that.msgFromGoodInfo,'2222');
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
              that.$message.error('网络出错，请稍后再试5！');
            }
          })
        }
      },
      items: {
        handler: function() {
          var that = this;
          // console.log('22');
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
      //获取注册登录banner
      init: function() {
        var that = this;
        that.global.axiosGetReq('/adv/showAdv',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.bindBanner = 'url(' + res.data.data[0].advImg + ')';
            // console.log(that.bindBanner)
          }else{
            that.$message.error('获取广告数据失败！');
          }
        })
      },
      menu: function() {
        var that = this;
        var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scroll >= 30) {
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
        that.$router.push({path: '/center'});
      },
      //首页搜索框
      search_cargo: function(item) {
        var that = this;
        if (item.word !== undefined) {
          that.searchCargo = item.word
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
              var obj = {
                word: that.searchCargo
              }
              if (JSON.parse(that.global.getHistory()) == null) {
                that.userHistory = []
              } else {
                that.userHistory = JSON.parse(that.global.getHistory());
              }
              that.userHistory.push(obj)
              that.global.setHistory(that.userHistory)
            }
            if (that.$router.history.current.name !== 'brandLib') {
              var data1 = res.data.data;
              var search_word = that.searchCargo;
              that.$router.push({ name: 'brandLib', params: { classifyIdAndbrandId: '0-0-0AND0', data: data1, word: search_word}});
              window.scroll(0,0);
            } else {
              var data2 = res.data.data;
              var search_word2 = that.searchCargo;
              data2.push(search_word2);
              that.$emit('listenToBrand', data2);
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
              console.log(res.data.data,'ppppp');
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
        console.log(obj,'i');
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
                  //console.log(res.data.data);
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
        // console.log('hh');
        that.$router.push({ path: '/index' });
      },
      // 我的订单
      myOrder: function() {
        var that = this;
        if (that.global.getToken() !== null) {
          that.$router.push({ path: '/center' });
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
        that.$router.push({ name: 'center', params: { current: false}});
      },
      // 登出
      logOut: function() {
        var that = this;
        var obj = {
          token: that.global.getToken()
        }
        that.global.axiosPostReq('/user/reLogin', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if (that.$router.history.current.name == 'center' || that.$router.history.current.name == 'gwc') {
              that.$router.push({ path: '/'})
            }
            // console.log(res);
            that.global.removeMsg()
            that.$message({
              message: '退出成功！',
              type: 'success'
            });
            that.hasLogin = true;
            that.car_num = 0;
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
            // this.loading = false;
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
              // console.log(res);
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
            // this.loading = false;
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
              // console.log(res);
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
            // this.loading = false;
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
              // console.log(res);
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
            // console.log(res.data.token);
            console.log(res,"查看token");
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
            console.log(res, '1');
            console.log(res.data, '2');
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
              message: '注册成功！',
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
    left: 127px;
    font-size: 12px;
    color: #D81E06;
  }
  .speH {
    width: 100%;
    position: fixed;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 99;
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
    margin-left: 60px;
    position: relative;
  }
  .my_order {
    margin-left: 60px;
  }
  .shopping_car {
    width: 100px;
    height: 26px;
    position: relative;
    cursor: pointer;
    border: 1px solid #fff;
    padding-left: 5px;
    padding-right: 5px;
    z-index: 1000;
  }
  .shopping_car .car_img {
    position: absolute;
    top: 4px;
  }
  .shopping_car .car_num {
    color: #D81E06;
    margin-left: 10px;
  }
  .gwcHeader {
    margin-left: 30px;
    width: 71px;
  }
  .logIn:hover, .register:hover, .my_order:hover, .yayi:hover, .system_enter:hover{
    color: #5DB7E7;
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
    margin-left: 60px;
  }
  .yayi:hover {
    color: #5DB7E7;
    cursor: pointer;
    transition: all ease 0.5s;
  }
/*------------页面购物车hover样式 start----------------*/
  .whiteLine {
    display: block;
    position: absolute;
    top: 26px;
    left: 110px;
    width: 268px;
    height: 1px;
    background-color: #e9e9e9;
    z-index: 9999;
  }
  .elseLine {
    display: none;
    position: absolute;
    top: 26px;
    left: 110px;
    width: 239px;
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
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
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
    color: #D81E06;
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
    color: #5DB7E8;
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
    background-color: #5DB7E7;
    text-align: center;
    border-radius: 6px;
    margin-top: 13px;
    color: #fff;
  }
/*------------页面购物车hover样式 end----------------*/
/*-------------------短信密码登录 start----------------------*/
  .transition-box {
    width: 100%;
    height: 500px;
    background-repeat: no-repeat;
    background-position: center;
/*    background: url(../../../images/index/logBg.jpg) center no-repeat;*/
    text-align: center;
  }
  .transition-box .logIn_container {
    width: 1200px;
    height: 500px;
    margin: 0 auto;
    position: relative;
/*    background-color: #EECE7C;*/
  }
  .transition-box .logIn_container .logIn_box {
    width: 572px;
    height: 427px;
    padding: 12px 11px 0 11px;
    position: absolute;
    top: 30px;
    right: 0px;
    background-color: #fff;
    box-shadow: 7px 7px 28px #778899;
    font-size: 14px;
    color: #000;
  }
  .ms_register {
    text-align: right;
    margin-bottom: 20px;
  }
  .ms_register:hover {
    color: #5DB7E7;
    cursor: pointer;
/*    transition: all ease 0.5s;
*/  }
  .logIn_header {
    width: 100%;
    height: 36px;
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
  }
  .speBottom {
    border-bottom: 3px solid #5DB7E7;
  }
  .pwdLog {
    width: 104px;
    height: 35px;
    line-height: 25px;
    font-size: 16px;
    float: left;
    text-align: center;
  }
  .messageLog:hover, .pwdLog:hover{
    cursor: pointer;
    color: #5DB7E7;
    transition: all ease 0.5s;
  }
  .des_box {
    width: 100%;
    height: 320px;
    margin-top: 2px;
  }
  .mobilePhone {
    width: 399px;
    height: 39px;
    margin-top: 50px;
  }
  .rightCode {
    width: 256px;
    height: 39px;
    margin-top: 39px;
    margin-right: 10px;
  }
  .pwd_box {
    margin-left: 11px;
  }
  .pwd {
    width: 399px;
    height: 39px;
    margin-top: 39px;
  }
  .getCode {
    display: inline-block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    background-color: #5DB7E7;
    color: #fff;
/*    background-color: #EBEBEB;*/
    text-align: center;
  }
  .getCode:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
  .logIn_btn {
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 40px;
    text-align: center;
    background-color: #5DB7E7;
    color: #fff;
  }
  .logIn_btn:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
  .logIn_btn2 {
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 16px;
    text-align: center;
    background-color: #5DB7E7;
    color: #fff;
  }
  .logIn_btn2:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
  .logIn_error {
    font-size: 12px;
    color: #D81E06;
    margin-top: 5px;
  }
  .forgetPwd {
    margin-top: 5px;
    margin-right: 55px;
    text-align: right;
  }
  .forgetPwd:hover {
    cursor: pointer;
    color: #5DB7E7;
    transition: all ease 0.5s;
  }
/*-------------------短信密码登录 end----------------------*/
/*-------------------忘记密码 strat----------------------*/
  .forgetPwd_box {
    width: 572px;
    height: 427px;
    padding: 12px 11px 0 11px;
    position: absolute;
    top: 30px;
    right: 0px;
    background-color: #fff;
    box-shadow: 7px 7px 28px #778899;
    font-size: 14px;
    color: #000;
  }
  .fg_mobilePhone {
    width: 399px;
    height: 39px;
    margin-top: 30px;
  }
  .fg_rightCode {
    width: 256px;
    height: 39px;
    margin-top: 20px;
    margin-right: 10px;
  }
  .fg_getCode {
    display: inline-block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    background-color: #5DB7E7;
    color: #fff;
    text-align: center;
  }
  .fg_pwd_box {
    margin-left: 11px;
  }
  .fg_pwd {
    width: 399px;
    height: 39px;
    margin-top: 39px;
  }
  .fg_confirmPwd {
    width: 399px;
    height: 39px;
    margin-top: 20px;
  }
  .fg_confirmPwd_box {
    margin-right: 15px;
  }
  .fg_confirm_btn {
    width: 250px;
    height: 40px;
    margin: 0 auto;
    margin-top: 39px;
    line-height: 40px;
    text-align: center;
    background-color: #5DB7E7;
    color: #fff;
  }
  .fg_alrHave {
    margin-right: 55px;
    margin-top: 5px;
    text-align: right;
  }
  .fg_alrHave:hover {
    cursor: pointer;
    color: #5DB7E7;
    transition: all ease 0.5s;
  }
  .fg_confirm_btn:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
/*-------------------忘记密码 end----------------------*/
/*-------------------注册页 statt----------------------*/
  .register_box {
    width: 572px;
    height: 427px;
    padding: 12px 11px 0 11px;
    position: absolute;
    top: 30px;
    right: 0px;
    background-color: #fff;
    box-shadow: 7px 7px 28px #778899;
    font-size: 14px;
    color: #000;
  }
  .rg_mobilePhone {
    width: 399px;
    height: 39px;
    margin-top: 30px;
  }
  .rg_rightCode {
    width: 256px;
    height: 39px;
    margin-top: 20px;
    margin-right: 10px;
  }
  .rg_getCode {
    display: inline-block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    background-color: #5DB7E7;
    color: #fff;
    text-align: center;
  }
  .rg_getCode:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
  .rg_pwd_box {
    margin-left: 11px;
  }
  .rg_pwd {
    width: 399px;
    height: 39px;
    margin-top: 30px;
  }
  .rg_confirmPwd {
    width: 399px;
    height: 39px;
    margin-top: 20px;
  }
  .rg_confirmPwd_box {
    margin-right: 15px;
  }
  .rg_confirm_btn {
    width: 250px;
    height: 40px;
    margin: 0 auto;
    margin-top: 39px;
    line-height: 40px;
    text-align: center;
    background-color: #5DB7E7;
    color: #fff;
  }
  .rg_confirm_btn:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.5s;
  }
  .rg_alrHave {
    margin-right: 55px;
    margin-top: 5px;
    text-align: right;
  }
  .rg_alrHave:hover {
    cursor: pointer;
    color: #5DB7E7;
    transition: all ease 0.5s;
  }
  .rg_logIn {
    text-align: right;
  }
  .rg_logIn:hover {
    color: #5DB7E7;
    cursor: pointer;
/*    transition: all ease 0.5s;*/
  }
  .alreadyLog:hover {
    color: #5DB7E7;
    cursor: pointer;
    transition: all ease 0.5s;
  }
  .logOut {
    color: #000;
    font-size: 12px;
    margin-left: 60px;
    float: right;
    transform: translateY(-5%);
  }
  .logOut:hover {
    color: #5DB7E7;
    cursor: pointer;
    transition: all ease 0.5s;
  }
  .rg_choose_box {
    margin-top: 15px;
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
    color: #D81E06;
    margin-top: 2px;
  }
/*-------------------注册页 end----------------------*/
  .headerSecond {
    width: 1200px;
    height: 63px;
    margin: 0 auto;
    margin-bottom: 50px;
/*    background-color: #EECE7C;*/
  }
  .headerSecond .search_box {
    margin-top: 18px;
    margin-right: 110px;
    position: relative;
  }
  .headerSecond .search_word {
    width: 420px;
    height: 33px;
    border: 1px solid #5DB7E8;
    outline: medium;
    padding-left: 45px;
  }
  .headerSecond .search_word:focus {
    border: 1px solid #5DB7E7 !important;
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
    background-color: #5DB7E7;
    text-align: center;
    color: #fff;
  }
  .search_p:hover {
    cursor: pointer;
    box-shadow: 0px 0px 7px #5DB7E7;
    transition: all 0.5s ease;
  }
  .historySearch {
    font-size: 14px;
    color: #333;

  }
  .historySearch:hover {
    cursor: pointer;
    color: #5db7e8;
    transition: all ease 0.5s;
  }
</style>
