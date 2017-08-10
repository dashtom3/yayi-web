<template>
  <el-form ref="ruleForm" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">牙医ABC后台系统</h3>
<!--     <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item> -->
    <el-form-item prop="phone">
      <el-input type="text" v-model="account.phone" auto-complete="off" placeholder="手机号" class="admin_phone"></el-input>
      <el-button type="primary" class="admin_code" v-if="hYzm" @click="hasCode">{{Yzm}}</el-button>
      <el-button type="primary" class="admin_code" v-else :disabled="true">{{Yzm1}}</el-button>
    </el-form-item>
    <el-form-item prop="code">
      <el-input type="text" v-model="account.code" auto-complete="off" placeholder="验证码"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
<!--     <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin('ruleForm')" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
import global from '../global/global'
  export default {
    data() {
      return {
        logining: false,
        hYzm: true,
        Yzm: '获取验证码',
        Yzm1: '',
        account: {
          username: '',
          pwd: '',
          phone: '',
          code: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ]
        },
        checked: false
      };
    },
    methods: {
      hasCode: function() {
        var that = this;
        var mb = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var sec = 60;
        if (that.account.phone == '' || !mb.test(that.account.phone)) {
          that.$message.error('请输入手机号');
          return false
        } else {
          that.loading = true;
          var obj = { phone: that.account.phone }
          that.global.axiosPostReq('/user/getVerifyCode', obj).then((res) => {
            that.loading = false;
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
              that.loading = true;
            }
          })
        }
      },
      //后台登录
      handleLogin(formName) {
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.loading = true;
            var obj = { 
              phone: that.account.phone,
              adminstratorPwd: that.account.pwd,
              code: that.account.code
            }
            that.global.axiosPostReq('/adminstrator/login', obj).then((res) => {
              if (res.data.callStatus === 'SUCCEED') {
                window.sessionStorage.setItem('accountType', res.data.num)
                that.loading = false;
                that.global.setAdminToken(res.data.token)
                that.$router.push({path: '/admin/bsseInfoManner/attr'})
              } else {
                that.$message.error(res.data.msg);
                that.loading = false;
              }
            })
          } else {
            return false;
          }
        });
      }
    }
  }

</script>
<style>
  body{
    background: #DFE9FB;
  }
</style>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .admin_phone {
    width: 200px;
    margin-right: 2px;
  }
  .admin_code {
    width: 143px;
    padding: 10px 20px 10px 20px;;
  }
</style>
