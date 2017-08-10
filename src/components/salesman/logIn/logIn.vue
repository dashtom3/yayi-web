<template>
    <div class="logIn_box">
        <div class="headerBox">
            <div class="headerFirst">
                <img class="logo_img" src="../../../images/index/logo.png" alt="img" @click="returnAcb">
                <div class="log right">
                    <span class="logIn" @click="logIn" :class="{'useractive':(userStatus === 'log')}">登录</span>/
                    <span class="register" @click="register" :class="{'useractive':userStatus == 'reg'}">注册</span>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <!--     短信密码登录 start    -->
        <div class="log_box" v-show="changeForget1" ref="contentHeight">
            <el-collapse-transition>
                <div v-show="showLogin1">
                    <div class="transition-box">
                        <div class="logIn_container">
                            <div class="logIn_box">
                                <p class="ms_register" @click="ms_register" @mouseover="arrow_in" @mouseout="arrow_out">
                                    <img v-if="arrowChange" src="../../../images/index/arrow_grey.png" alt="img"
                                         style="margin-right: 10px;"><img v-else
                                                                          src="../../../images/index/arrow_blue.png"
                                                                          alt="img" style="margin-right: 10px;">注册</p>
                                <div class="logIn_header">
                                    <div class="pwdLog" :class="{ speBottom: isLog2}" @click="pwdLog">密码登录</div>
                                    <div class="messageLog" :class="{ speBottom: isLog1}" @click="messageLog">短信登录</div>
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
                                        <button class="getCode" @click="hasYzm(ms_mobilephone)" v-if="hYzm">{{Yzm}}
                                        </button>
                                        <button class="getCode" @click="hasYzm()" style="background-color: #C8C8C8;"
                                                v-else disabled>{{Yzm1}}
                                        </button>
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
                    <div class="transition-box">
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
                                    <button class="getCode" @click="fg_hasYzm(fg_mobilephone)" v-if="fg_hYzm">
                                        {{fg_Yzm}}
                                    </button>
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
                                    <input class="fg_confirmPwd" type="password" v-model="fg_confirmPwd"
                                           @keyup.enter="fg_confirm">
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
                    <div class="transition-box">
                        <div class="logIn_container">
                            <div class="register_box">
                                <p class="rg_logIn" @click="rg_logIn" @mouseover="arrow_in" @mouseout="arrow_out"><img
                                        v-if="arrowChange" src="../../../images/index/arrow_grey.png" alt="img"
                                        style="margin-right: 10px;"><img v-else
                                                                         src="../../../images/index/arrow_blue.png"
                                                                         alt="img" style="margin-right: 10px;">登录</p>
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
                                    <input class="rg_confirmPwd" type="password" v-model="rg_confirmPwd"
                                           @keyup.enter="rg_register">
                                    <transition name="shake">
                                        <p v-show="rgConfirmPwd_alert" class="error">设置密码与确认密码不一致!</p>
                                    </transition>
                                </div>
                                <!--                   <p class="rg_alrHave" @click="rg_alrHave">已有账号</p> -->
                                <div class="rg_confirm_btn" @click="rg_register">注册</div>
                                <div class="rg_choose_box">
                                    <input type="checkbox" v-model="agree" class="checkYa"/><span
                                        class="rg_choose_word">我已阅读并同意<em
                                        class="protocal" @click="goProtocol">创客管理协议</em></span>
                                </div>
                                <transition name="shake">
                                    <p class="rg_choose_error" v-show="rgAgree_alert">请先同意创客管理协议!</p>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <!--     注册页 end    -->
        <salesFoot></salesFoot>
        <message :title="title" v-show="messageShow" @messageshow="messageChange">{{content}}</message>
    </div>
</template>

<script>
  var crypto = require('crypto');
  import salesFoot from "../index/footer"
  import message from "../index/message"


  export default {
    name: 'logIn',
    data() {
      return {
        car_num: 0,
        arrowChange: true,
        hasLogin: true,
        username: '',
        changeForget1: true,
        changeForget2: false,
        changeForget3: false,
        showLogin1: true,
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
        total_num: 0,
        total_price: 0,
        searchCargo: '',
        userStatus: 'log',
        messageShow: false,
        title: '',
        content: '',
      }
    },
    components: {
      salesFoot,
      message
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
    created: function () {
      var that = this
      if (that.$route.params.data == 'RE_LOGIN') {
        that.$message.error('登录过期，请重新登录！')
        return false
      }
    },
    mounted() {
      var kk = this.$refs.contentHeight;
      var wh = document.body.scrollHeight;
      kk.style.minHeight = wh - 120 - 70 + 'px';
    },
    watch: {
      items: {
        handler: function () {
          var that = this;
          console.log('22');
        },
        deep: true
      },
      //监听短信登录手机号验证
      ms_mobilephone: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.ms_mobilephone !== '' && mb.test(that.ms_mobilephone)) {
          that.msPhone_alert = false;
        }
      },
      //监听短信登录验证码验证
      ms_yzm: function () {
        var that = this;
        if (that.ms_yzm !== '' && that.ms_yzm.length >= 6) {
          that.msCode_alert = false;
        }
      },
      //监听密码登录手机号验证
      pwd_mobilephone: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.pwd_mobilephone !== '' && mb.test(that.pwd_mobilephone)) {
          that.pwdPhone_alert = false;
        }
      },
      //监听密码登录密码验证
      pwd_pwd: function () {
        var that = this;
        if (that.pwd_pwd.length > 5 && that.pwd_pwd.length < 17 && that.pwd_pwd !== '') {
          that.pwdpwd_alert = false;
        }
      },
      //监听忘记密码手机号验证
      fg_mobilephone: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.fg_mobilephone !== '' && mb.test(that.fg_mobilephone)) {
          that.fgPhone_alert = false;
        }
      },
      //监听忘记密码验证码验证
      fg_code: function () {
        var that = this;
        if (that.fg_code !== '' && that.fg_code.length >= 6) {
          that.fgCode_alert = false;
        }
      },
      //监听忘记密码密码验证
      fg_pwd: function () {
        var that = this;
        if (that.fg_pwd.length > 5 && that.fg_pwd.length < 17 && that.fg_pwd !== '') {
          that.fgPwd_alert = false;
        }
      },
      //监听忘记密码确认密码验证
      fg_confirmPwd: function () {
        var that = this;
        if (that.fg_confirmPwd == that.fg_pwd && that.fg_confirmPwd !== '') {
          that.fgConfirmPwd_alert = false;
        }
      },
      //监听注册页手机号验证
      rg_mobilephone: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (that.rg_mobilephone !== '' && mb.test(that.rg_mobilephone)) {
          that.rgPhone_alert = false;
        }
      },
      //监听注册页验证码验证
      rg_code: function () {
        var that = this;
        if (that.rg_code !== '' && that.rg_code.length >= 6) {
          that.rgCode_alert = false;
        }
      },
      //监听注册页密码验证
      rg_pwd: function () {
        var that = this;
        if (that.rg_pwd.length > 5 && that.rg_pwd.length < 17 && that.rg_pwd !== '') {
          that.rgPwd_alert = false;
        }
      },
      //监听注册页确认密码验证
      rg_confirmPwd: function () {
        var that = this;
        if (that.rg_confirmPwd == that.rg_pwd && that.rg_confirmPwd !== '') {
          that.rgConfirmPwd_alert = false;
        }
      },
      //监听注册页同意条款验证
      agree: function () {
        var that = this;
        if (that.agree == true) {
          that.rgAgree_alert = false;
        }
      },
    },
    methods: {
      // 返回电商网站
      returnAcb: function () {
        // var that = this;
        // that.$router.push({path: '/'});
      },
      //显示协议浮窗
      goProtocol() {
        this.messageShow = true;
        this.title = `创客管理协议`
        this.content = `
甲方：上海庄乾牙科科技有限公司
乙方：注册用户
1.总则
第1条 本协议之甲方为yayiabc.com平台（以下称平台）的所有者与运营管理者，对于在平台上所发布的一切协议/规则/活动拥有最终解释权，并因此承担一切法律责任与后果。
第2条 本协议之乙方为平台的注册用户，所谓“创客”专指在平台创客系统注册的/有义齿工厂销售背景的/自愿与平台进行销售/客服合作的注册用户：
（1）注册前，必须认真阅读本协议条款；
（2）注册行为完成，则表示乙方同意并自愿接受本协议条款，获得本协议条款所规定的权利/义务/责任，承担因违约带来的责任/后果。
第3条 甲方有权根据平台之经营管理的需要与经营环境的变化，适时对本协议条款进行完善与修改，同时：
（1）甲方对于协议条款的修改，必须先行在平台公示一个月/然后才能执行；
（2）甲方对于协议条款的修改，以不损害乙方的既有利益为前提。
2. 注册规则
第4条 乙方注册时必须完整/真实地填写注册内容，并承担因填写虚假信息所带来的一切法律后果与责任；乙方注册审核的周期为1个工作日。
3. 保密规则
第5条 甲方对于乙方的注册信息承担保密义务与责任：
(1) 甲方承诺：甲方不得向任何第三方透露乙方注册信息；未经乙方授权，甲方亦不得向任何商业合作方链接乙方注册信息；
(2) 由于甲方的数据存储于第三方云端服务器，对于因第三方云端服务器安全原因导致的乙方注册信息泄露，甲方免担责任；但甲方有义务在乙方授权的前提下代表乙方向第三方云端服务器提供商进行交涉与索赔；
(3) 因政府管理部门强制获取乙方注册信息的行为，导致乙方注册信息的泄露，甲方免担责任。
(4) 因甲方原因，导致乙方的注册信息泄露给第三方，由甲方承担责任，并按国家有关法律规定进行处理。
第6条 乙方对于在甲方获得的一切商业信息，必须承担保密义务与责任：
(1) 该一切商业信息包括但不限于：甲方对乙方的培训内容与方法、甲方的销售计划与推广方式、乙方绑定的客户信息与采购数据、乙方的销售业绩与收入数据、甲方的利益分享方式与数据；
(2) 对于乙方向任何第三方泄露甲方商业信息的行为，甲方保留采取一切责任追究与索赔的权力，包括关闭其注册账户。
4. 客户绑定规则
第7条 本协议所指客户包括：
(1) 牙科门诊/牙科医院；
(2) 义齿制作工厂/义齿制作公司；
(3) 牙科医生/牙科门诊与牙科医院从业人员；
(4) 牙科技工/义齿制作工厂与公司从业人员。
第8条 本协议之客户绑定，是指在本平台注册的客户与乙方的链接关系：
(1) 客户注册时，明确填写注册客服代表为乙方；
(2) 客户与乙方的绑定行为发生，该客户的平台交易行为将自动与乙方发生链接，乙方自动分享客户商业价值的收益；
(3) 甲方无权修改客户与乙方的绑定关系；但对于客户自行修改的绑定关系，甲方予以承认；
(4) 对于客户自行修改的绑定关系，审核时间为3个工作日；期间，甲方会与客户沟通，并在第一时间通知乙方。
第9条 乙方绑定客户的有效认定，按以下条款执行：
(1) 对于牙科门诊/牙科医院/义齿制作工厂/义齿制作公司类客户，在平台注册时绑定乙方；
（2）该客户在注册后10个工作日内完成第一笔采购行为，则该客户与乙方的绑定生效；（3）若该客户在注册后10个工作日内未完成第一笔采购，则甲方平台会自动取消该客户与乙方的绑定链接，并在取消前提醒乙方完成交易。
(4) 对于牙医/技工类客户，在yaiyiabc.com注册时绑定乙方，即为有效；但是，若该客户在注册后6个月内，未有平台交易行为，则甲方有权中止该客户与乙方的绑定关系；
（5）本条款所谓“平台交易行为”是指：平台的培训/进修/采购等活动的参与或购买。
第10条 对于第9条第（1）款所指客户，在绑定关系确定后，若其连续3个月未在平台发生采购行为，则平台将自动取消该客户与乙方的绑定关系；但平台之客服会及时提醒/并帮助乙方促成该绑定客户的平台采购行为。
第11条 对于因故取消既有绑定关系的客户，甲方会及时在平台创客系统内公布，所有销售创客都有权利按本协议条款对该客户进行绑定。
5.利益分享规则
第12条 乙方对于其绑定客户在平台的一切购买交易行为给甲方带来的收入，包括客户因特殊情形的线下购买交易行为给甲方带来的收入，均享有利益分享权；但对于公益与营销推广行为的交易所产生的甲方收入，乙方没有利益分享权。
第13条 甲方对于乙方的利益分享之基本标准确定如下：
(1) 耗材类产品，乙方按其绑定客户的实际交易总额之5%分享收益；
(2) 工具设备类产品，乙方按其绑定客户的实际交易总额之1.5%分享收益；
(3) 服务类产品，包括但不限于培训/进修，乙方按其绑定客户的实际交易总额之6%分享收益；
(4) 知识产权类产品，包括但不限于病例点击/视屏点击收费，乙方按其绑定客户的实际交易总额之6%分享收益。
第14条 协议有效期内，甲方不以任何理由与借口，降低乙`
      },
      messageChange(e) {
        this.messageShow = e;
        console.log(e);
      },
      // 登录成功后
      alreadyLog: function () {
        var that = this;
        that.$router.push({name: 'center', params: {current: false}});
      },
      // 箭头变色
      arrow_in: function () {
        var that = this;
        that.arrowChange = false;
      },
      arrow_out: function () {
        var that = this;
        that.arrowChange = true;
      },
      // 页头点击登录按钮
      logIn: function () {
        var that = this;
        this.userStatus = 'log';
        that.changeForget1 = true;
        that.changeForget2 = false;
        that.changeForget3 = false;
        that.showLogin1 = true;
        that.showLogin2 = false;
        that.showLogin3 = false;
        // that.showLogin1 = !that.showLogin1;
      },
      // 页头点击注册按钮
      register: function () {
        var that = this;
        this.userStatus = 'reg';
        that.changeForget1 = false;
        that.changeForget2 = false;
        that.changeForget3 = true;
        that.showLogin1 = false;
        that.showLogin2 = false;
        that.showLogin3 = true;
      },
      // 短信登录tab切换
      messageLog: function () {
        var that = this;
        that.changeLog1 = true;
        that.changeLog2 = false;
        that.isLog1 = true;
        that.isLog2 = false;
      },
      // 密码登录tab切换
      pwdLog: function () {
        var that = this;
        that.changeLog1 = false;
        that.changeLog2 = true;
        that.isLog1 = false;
        that.isLog2 = true;
      },
      // 忘记密码按钮
      forgetPwd: function () {
        var that = this;
        that.changeForget1 = false;
        that.changeForget2 = true;
        that.changeForget3 = false;
        that.showLogin1 = false;
        that.showLogin2 = true;
        that.showLogin3 = false;
      },
      // 已有账号按钮
      fg_alrHave: function () {
        var that = this;
        that.changeForget1 = true;
        that.changeForget2 = false;
        that.changeForget3 = false;
        that.showLogin1 = true;
        that.showLogin2 = false;
        that.showLogin3 = false;
      },
      // 右上角注册按钮
      ms_register: function () {
        var that = this;
        this.userStatus = 'reg';
        that.changeForget1 = false;
        that.changeForget2 = false;
        that.changeForget3 = true;
        that.showLogin1 = false;
        that.showLogin2 = false;
        that.showLogin3 = true;
      },
      // 右上角登录按钮
      rg_logIn: function () {
        var that = this;
        this.userStatus = 'log';
        that.changeForget1 = true;
        that.changeForget2 = false;
        that.changeForget3 = false;
        that.showLogin1 = true;
        that.showLogin2 = false;
        that.showLogin3 = false;
      },
      // 获取验证码
      hasYzm: function (ms_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.ms_mobilephone == '' || !mb.test(that.ms_mobilephone)) {
          that.msPhone_alert = true
          return false
        } else {
          var obj = {phone: that.ms_mobilephone}
          that.global.axiosPostReq('/saleLog/getVerifyCode', obj)
            .then((res) => {
              // this.loading = false;
              if (res.data.callStatus === 'SUCCEED') {
                for (let i = 0; i <= 60; i++) {
                  window.setTimeout(function () {
                    if (sec != 0) {
                      that.hYzm = false;
                      that.Yzm1 = sec + "秒后重发验证";
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
                console.log(res);
              }
            })
        }
      },
      fg_hasYzm: function (fg_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.fg_mobilephone == '' || !mb.test(that.fg_mobilephone)) {
          that.fgPhone_alert = true
        } else {
          var obj = {phone: that.fg_mobilephone}
          that.global.axiosPostReq('/saleLog/getVerifyCode', obj)
            .then((res) => {
              // this.loading = false;
              if (res.data.callStatus === 'SUCCEED') {
                for (let i = 0; i <= 60; i++) {
                  window.setTimeout(function () {
                    if (sec != 0) {
                      that.fg_hYzm = false;
                      that.fg_Yzm1 = sec + "秒后重发验证";
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
                console.log(res);
              }
            })
        }
      },
      rg_hasYzm: function (rg_mobilephone) {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.rg_mobilephone == '' || !mb.test(that.rg_mobilephone)) {
          that.rgPhone_alert = true
        } else {
          var obj = {phone: that.rg_mobilephone}
          that.global.axiosPostReq('/saleLog/getVerifyCode', obj)
            .then((res) => {
              // this.loading = false;
              if (res.data.callStatus === 'SUCCEED') {
                for (let i = 0; i <= 60; i++) {
                  window.setTimeout(function () {
                    if (sec != 0) {
                      that.rg_hYzm = false;
                      that.rg_Yzm1 = sec + "秒后重发验证";
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
                console.log(res);
              }
            })
        }
      },
      // 短信登录btn
      ms_logIn: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!mb.test(that.ms_mobilephone) || that.ms_mobilephone == '') {
          that.msPhone_alert = true;
          return false
        }
        if (that.ms_yzm == '' || that.ms_yzm.length < 4) {
          that.msCode_alert = true;
          return false
        }
        var obj = {
          phone: that.ms_mobilephone,
          code: that.ms_yzm,
        }
        that.global.axiosPostReq('/saleLog/noteLogin', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.global.setSalesToken(res.data.token)
            that.global.setSalesUser(res.data.data)
            that.$message({
              message: '登录成功！',
              type: 'success'
            });
            that.ms_mobilephone = '';
            that.ms_yzm = '';
            that.$router.push({path: '/salesIndex'});
            return false
          } else {
            that.$message.error(res.data.msg);
          }
        })
      },
      // 密码登录btn
      pwd_logIn: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!mb.test(that.pwd_mobilephone) || that.pwd_mobilephone == '') {
          that.pwdPhone_alert = true;
          return false
        }
        if (that.pwd_pwd.length < 6 || that.pwd_pwd.length > 16 || that.pwd_pwd == '') {
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
        that.global.axiosPostReq('/saleLog/pwdLogin', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data.token);
            that.global.setSalesToken(res.data.token)
            that.global.setSalesUser(res.data.data)
            that.$message({
              message: '登录成功！',
              type: 'success'
            });
            that.pwd_mobilephone = '';
            that.pwd_pwd = '';
            that.$router.push({path: '/salesIndex'});
          } else {
            that.$message.error(res.data.msg);
          }
        })
      },
      // 忘记密码确认btn
      fg_confirm: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!mb.test(that.fg_mobilephone) || that.fg_mobilephone == '') {
          that.fgPhone_alert = true;
          return false
        }
        if (that.fg_code == '' || that.fg_code.length < 4) {
          that.fgCode_alert = true;
          return false
        }
        if (that.fg_pwd.length < 6 || that.fg_pwd.length > 16 || that.fg_pwd == '') {
          that.fgPwd_alert = true;
          return false
        }
        if (that.fg_confirmPwd !== that.fg_pwd || that.fg_confirmPwd == '') {
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
        that.global.axiosPostReq('/saleLog/forgetPwd', obj).then((res) => {
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
      rg_register: function () {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!mb.test(that.rg_mobilephone) || that.rg_mobilephone == '') {
          that.rgPhone_alert = true;
          return false
        }
        if (that.rg_code == '' || that.rg_code.length < 4) {
          that.rgCode_alert = true;
          return false
        }
        if (that.rg_pwd.length < 6 || that.rg_pwd.length > 16 || that.rg_pwd == '') {
          that.rgPwd_alert = true;
          return false
        }
        if (that.rg_confirmPwd !== that.rg_pwd || that.rg_confirmPwd == '') {
          that.rgConfirmPwd_alert = true;
          return false
        }
        if (that.agree == false) {
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
        that.global.axiosPostReq('/saleLog/register', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.global.setSalesToken(res.data.token)
            that.global.setSalesUser(res.data.data)
            that.$message({
              message: '注册成功！',
              type: 'success'
            });
            that.pwd_mobilephone = '';
            that.pwd_pwd = '';
            that.rg_mobilephone = '';
            that.rg_pwd = '';
            that.rg_code = '';
            that.rg_confirmPwd = '';
            that.agree = false;
            that.$router.push({path: '/salesIndex'});
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
    /*----------------公共样式 start-------------------*/

    .useractive {
        color: #005aab;
    }

    .protocal {
        color:#005aab;
        font-style: normal;
        font-size: 12px;
        cursor: pointer;
    }

    input {
        border: 1px solid #e9e9e9;
        outline: medium;
        font-size: 15px;
        padding: 0 7px 0 7px;
    }

    input:focus {
        border: 1px solid #e9e9e9;
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

    /*----------------公共样式 end-------------------*/
    /*----------------页头 strat-------------------*/
    .headerBox {
        width: 100%;
        height: 70px;
        border-bottom: 1px #eee solid;
        box-shadow: 1px 1px 5px #eee;
    }

    .headerFirst {
        width: 1200px;
        height: 70px;
        line-height: 70px;
        margin: 0 auto;
        margin-bottom: 22px;
        font-size: 14px;
        color: #000;
        z-index: 1000;
    }

    .logo_img {
        width: 129px;
        height: 41px;
        margin-top: 15px;
    }

    .log {
        margin-left: 60px;
        position: relative;
    }

    .logIn:hover, .register:hover {
        color: #005aab;
        cursor: pointer;
        transition: all ease 0.5s;
    }

    .log_box, .log_box2 {
        width: 100%;
        height: 771px;
    }

    /*----------------页头 end-------------------*/
    /*-------------------短信密码登录 start----------------------*/
    .transition-box {
        width: 100%;
        height: 500px;
        background: url(../../../images/index/logBg2.png) center no-repeat;
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
        color: #005aab;
        cursor: pointer;
        /*    transition: all ease 0.5s;
        */
    }

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
    }

    .messageLog:hover, .pwdLog:hover {
        cursor: pointer;
        color: #005aab;
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
        background-color: #005aab;
        color: #fff;
        /*    background-color: #EBEBEB;*/
        text-align: center;
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
        margin-top: 16px;
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
        color: #005aab;
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
        background-color: #005aab;
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
        background-color: #005aab;
        color: #fff;
    }

    .fg_alrHave {
        margin-right: 55px;
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
        background-color: #005aab;
        color: #fff;
        text-align: center;
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
        width: 399px;
        height: 39px;
        margin-top: 39px;
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
        font-size: 14px;
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
</style>
