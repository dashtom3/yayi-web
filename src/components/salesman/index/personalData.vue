<template>
  <div class="personalData">
    <div class="perDataLeft">
      <span :class="{moreBlue:showPane==1}" @click='changShowPane(1)'>基础资料</span>
      <span :class="{moreBlue:showPane==2}" @click='changShowPane(2)'>提现设置</span>
    </div>
    <!-- 基础资料 -->
    <div v-if="showPane==1">
      <div class="perDataRight">
        <div v-if="showDefaultData" class="defaultData">
          <div style="margin: -54px 0 0 460px;">
            <el-upload
              class="avatar-uploader"
              :disabled="true"
              :action="qiNiuUrl"
              :show-file-list="false"
              :on-success="uploadFile"
              :data="qiNiuToken">
              <img v-if="personalData.salePic"  style="cursor:auto;" :src="personalData.salePic" class="avatar defaultCss">
              <img src="../../../images/center/loadUserImg3.png"  style="cursor:auto;" class="defaultCss" v-if="!personalData.salePic">
            </el-upload>
          </div>
          <div class="persInfo">
            <div class="clearfix">
              <ul class="fl infowrap">
                <li><span class="infoLeft"><span class="infoName">手机号：</span>{{personalData.phone}}</span></li>
                <li><span class="infoLeft"><span class="infoName">性别：</span>{{sexShow}}</span></li>
                <li><span class="infoLeft"><span class="infoName">微信：</span>{{personalData.weChar}}</span></li>
                <li><span class="infoLeft"><span class="infoName">出生日期：</span>{{birthDay}}</span></li>
                <li><span class="infoLeft"><span class="infoName">工作单位：</span>{{personalData.workUnit}}</span></li>
              </ul>
              <ul class="fl infowrap" style="margin-left: 320px;margin-bottom:20px;">
                <li><span class="infoRight"><span class="infoName">真实姓名：</span>{{personalData.trueName}}</span></li>
                <li><span class="infoRight"><span class="infoName">身份证号：</span>{{personalData.idCard}}</span></li>
                <li><span class="infoRight"><span class="infoName">邮箱：</span>{{personalData.email}}</span></li>
                <li><span class="infoRight"><span class="infoName">学历：</span>{{personalData.education}}</span></li>
                <li><span class="infoRight"><span class="infoName">工作职位：</span>{{personalData.workPosition}}</span></li>
              </ul>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">所在地省市区：</span>{{partFormate}}</span>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">详细地址：</span>{{personalData.address}}</span>
            </div>
            <div class="goToEditData">
              <span @click="goToEditData()">编辑资料</span>
            </div>
          </div>
        </div>
        <div v-else class="edit">
          <div style="margin: -54px 0 0 460px;">
            <el-upload
              class="avatar-uploader"
              :action="qiNiuUrl"
              :show-file-list="false"
              :on-success="uploadFile"
              :data="qiNiuToken">
              <img v-if="personalData.salePic" :src="personalData.salePic" class="avatar defaultCss">
              <img src="../../../images/center/loadUserImg3.png" class="defaultCss" v-if="!personalData.salePic">
              <div class="clearfix"></div>
              <span style="margin-top:4px;" v-if="!personalData.salePic">上传头像</span>
              <span style="margin-top:4px;" v-if="personalData.salePic">更改头像</span>
            </el-upload>
          </div>
          <div class="editPersonalData">
            <el-form :label-position="lablePosi"  label-width="150px"  :model="personalData" :rules="personalDataRule" ref="personalData">
              <el-form-item label="手机号：" prop="phone">
                <el-input v-model="personalData.phone" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名：" prop="trueName">
                <el-input v-model.trim="personalData.trueName"></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="personalData.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="身份证号：" prop="idCard">
                <el-input v-model.trim="personalData.idCard"></el-input>
              </el-form-item>
              <el-form-item label="微信号：" prop="weChar">
                <el-input v-model.trim="personalData.weChar"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model.trim="personalData.email"></el-input>
              </el-form-item>
              <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" v-model="personalData.birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="学历：" prop="education">
                <el-input v-model.trim="personalData.education"></el-input>
              </el-form-item>
              <el-form-item label="工作单位：" prop="workUnit">
                <el-input v-model.trim="personalData.workUnit"></el-input>
              </el-form-item>
              <el-form-item label="工作职位：" prop="position">
                <el-input v-model.trim="personalData.workPosition"></el-input>
              </el-form-item>
              <el-form-item label="所在地省市区：" prop="part">
                <positionPicker v-on:getMsgFromChildren="positionFromPicker" :selected="this.personalData.part"></positionPicker>
              </el-form-item>
              <el-form-item label="详细地址：" prop="address">
                <el-input v-model.trim="personalData.address"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveEditPersData('personalData')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 提现设置 -->

    <div v-else>
      <div class="perDataRight">
          <div v-if="getMoneySet">
            <div class="baseInfo">
              <span class="info1">
                <span class="infoName">类型：</span><span>{{personalData.postalType}}</span><span v-if="personalData.bankName">{{'（ '+personalData.bankName+' ）'}}</span>
              </span>
              <span class="info2">
                <span class="infoName">开户者：</span><span>{{personalData.openName}}</span>
              </span>
              <span class="info3">
                <span class="infoName">{{personalData.postalType+'账户'}}：</span><span>{{personalData.accountNumber}}</span>
              </span>
            </div>
            <div class="setBtnWrap">
              <span @click="setGetMoney()">设置</span>
            </div>
          </div>
          <div v-else>
            <div class="editSetGetMoney">
              <el-form :label-position="lablePosi"  label-width="150px"  :model="personalData" :rules="personalDataRule" ref="personalData">
                <el-form-item label="类型：" prop="type" style="height:36px;">
                  <el-select v-model="typeValue" placeholder="请选择" @change="changeHandler">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="typeValue!=='支付宝'" label="银行：" prop="bankName">
                  <el-input v-model.trim="personalData.bankName"></el-input>
                </el-form-item>
                <el-form-item label="开户者：" prop="openName">
                  <el-input v-model.trim="personalData.openName"></el-input>
                </el-form-item>
                <el-form-item v-if="typeValue!=='支付宝'" label="银行卡账号：" prop="accountNumber">
                  <el-input v-model.trim="personalData.accountNumber"></el-input>
                </el-form-item>
                <el-form-item v-else label="支付宝账号：" prop="accountNumber">
                  <el-input v-model.trim="personalData.accountNumber"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveEditGetMoeny('personalData')">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import positionPicker from "./positionSelect"
  import global from "../../global/global"
  import util from '../../../common/util'
  export default {
    name: 'personalData',
    props: ['toEditDraw','toEditPay'],
    data () {
      return {
        options: [{
          value: '银行卡',
          label: '银行卡'
        }, {
          value: '支付宝',
          label: '支付宝'
        }],
        typeValue: '支付宝',
        lablePosi:"right",
        showPane:1,
        showDefaultData:false,
        getMoneySet:false,
        imageUrl: '',
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
        bindGetMoneyCount:{},
        personalData:{
          trueName: '',
          idCard: '',
          weChar: '',
          email: '',
          sex: '',
          birthday: '',
          part: [],
          address: '',
          education: '',
          workUnit: '',
          workPosition: '',
          salePic: ''
        },
        personalDataRule:{
          trueName: [
            { required: true, message: '请填写真实姓名', trigger: 'change' },
            // { pattern: /^[\u4E00-\u9FA5]+$/, message: '真实姓名只能为中文' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          idCard: [
            { required: true, message: '请输入身份证号', trigger: 'change' },
            { pattern: /^(\d{15}|\d{17}[\dxX])$/, message: '请输入正确的身份证号码' }
          ],
          weChar: [
            { required: true, message: '请填写微信号', trigger: 'change' },
            // { pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, message: '请输入正确的微信号' }
          ],
          email: [
            { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '请输入正确的邮箱' }
          ],
          openName:[
            { required: true, message: '请填写真实姓名', trigger: 'change' }
          ],
          accountNumber:[
            { required: true, message: '请填写账号信息', trigger: 'change'}
            // { pattern: /(\d{15}|\d{19})|(1[34578]\d{9})/, message: '请输入正确的账号' }
          ],
          bankName:[
            { required: true, message: '请填写银行名称', trigger: 'change'}
          ],
        },
      }
    },
    computed: {
      partFormate: function(){
        return this.personalData.part && this.personalData.part.join('/')
      },
      sexShow: function(){
        return this.personalData.sex && this.personalData.sex.toString() === '2' ? '女' : '男'
      },
      birthDay: function(){
        return new Date(this.personalData.birthday).getFullYear() + '-' + this.fillZero((new Date(this.personalData.birthday).getMonth() + 1)) + '-' + this.fillZero(new Date(this.personalData.birthday).getDate())
      }
    },
    components: {
      positionPicker
    },
    created: function() {
      //获取七牛token
      global.axiosGetReq('/file/getUpToken', null).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          this.qiNiuToken = {
            token: res.data.msg
          }
        }
      })
      //钱包未设置提现方式跳转过来的状态
      if(this.toEditDraw && this.toEditDraw.isActive){
        this.changShowPane(2)
      }
      if(this.toEditPay && this.toEditPay.isActive){
        this.changShowPane(2)
      }
      this.queryPersonInfo()
    },
    methods: {
      changeHandler: function(key){
        if(key === '支付宝'){
          this.personalData.openName = ''
          this.personalData.accountNumber = ''
        }else if(key === '银行卡'){
          this.personalData.openName = ''
          this.personalData.accountNumber = ''
          this.personalData.bankName = ''
        }
        
      },
      fillZero: function(n){
        return n<10 ? '0'+ n: n 
      },
      //查询个人信息
      queryPersonInfo: function(){
        let params = {
          phone: global.getSalesUser().phone,
          token: global.getSalesToken()
        }
        global.axiosGetReq('/saleInfo/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.global.setSalesUser(res.data.data)
            this.personalData = res.data.data
            this.personalData.part = res.data.data.part && res.data.data.part.split(',') || ['北京','北京市','东城区']
            this.personalData.birthday = res.data.data.birthday && res.data.data.birthday || new Date().getFullYear()+ '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
            this.personalData.sex = res.data.data.sex && res.data.data.sex.toString() || '1'
            this.personalData.postalType = res.data.data.postalType
            if(this.personalData.trueName){
              this.showDefaultData = true
            }
            if(this.personalData.postalType){
              this.getMoneySet = true
            }
          }
        })
      },
      saveEditGetMoeny:function(formName){
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let params
            if(this.typeValue === '支付宝'){
              params = {
                postalType: '支付宝',
                openName: this.personalData.openName,
                accountNumber: this.personalData.accountNumber,
                token: global.getSalesToken()
              }
            }else if(this.typeValue === '银行卡'){
              params = {
                postalType: '银行卡',
                bankName: this.personalData.bankName,
                openName: this.personalData.openName,
                accountNumber: this.personalData.accountNumber,
                token: global.getSalesToken()
              }
            }
            global.axiosPostReq('/saleInfo/updatePostal',params).then((res) => {
              if(res.data.callStatus === 'SUCCEED'){
                this.$message({
                  message: '设置成功',
                  type: 'success'
                });
                this.queryPersonInfo()
                that.getMoneySet = true;
              }
            }) 
          } else {
            return false;
          }
        });
      },
      setGetMoney:function(){
        this.typeValue = this.personalData.postalType
        this.getMoneySet = false;
      },
      goToEditData:function(){
        this.personalData.sex = this.personalData.sex && this.personalData.sex.toString()
        this.showDefaultData = false;
      },
      changShowPane:function(arg){
        this.showPane = arg;
        // this.toEditPay.flag = ''
        // this.toEditPay.isActive = false
        // this.toEditDraw.flag = ''
        // this.toEditDraw.isActive = false
      },
      positionFromPicker:function(data){
        var that = this;
        that.personalData.part = data;
      },
      uploadFile(res, file) {
        this.personalData.salePic = global.qiniuShUrl + file.response.key
        this.imageUrl = global.qiniuShUrl + file.response.key
      },
      //编辑个人信息
      saveEditPersData:function(formName){
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              trueName: this.personalData.trueName,
              idCard: this.personalData.idCard,
              weChar: this.personalData.weChar,
              email: this.personalData.email,
              sex: this.personalData.sex,
              birthday: util.formatDate.format(new Date(this.personalData.birthday)),
              part: this.personalData.part.join(","),
              address: this.personalData.address,
              education: this.personalData.education,
              workUnit: this.personalData.workUnit,
              workPosition: this.personalData.workPosition,
              salePic: this.personalData.salePic,
              token: global.getSalesToken()
            }
            //验证生日必输
            if(!this.personalData.birthday){
              this.birthDay_validate = true;
              return false;
            }
            global.axiosPostReq('/saleInfo/updateSale',params).then((res) => {
              if(res.data.callStatus === 'SUCCEED'){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                that.queryPersonInfo()
                that.showDefaultData = true
              }
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
.personalData{
  width: 1200px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 100px;
}
.editPersonalData{
  width: 630px;
  margin: auto;
  margin-top: 30px;
}
.infowrap li{
  height: 60px;
  line-height: 60px;
}
.perDataLeft{
  float: left;
}
.perDataRight{
  margin-left: 130px;
  border: 1px solid #eeeeee;
  min-height: 580px;
  position: relative;
  margin-top: 80px;
}
.headImgWrap{
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  text-align: center;
  cursor: pointer;
}
.headImgWrap .imgWrap{
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: 5px 5px 10px #eeeeee;
  overflow: hidden;
  cursor: pointer;
  background: white;
  margin-bottom: 10px;
}
.headImgWrap .imgWrap img{
  max-width: 100%;
  max-height: 100%;
}
.perDataLeft span{
  width: 110px;
  display: block;
  line-height: 40px;
  text-align: center;
  color: white;
  background: #005aab;
  margin-bottom: 2px;
  cursor: pointer;
}
.perDataLeft .moreBlue{
background: #329af0;
}
.persInfo{
  width: 818px;
  margin: auto;
  margin-top: 40px;
}
.persInfo .oneLineInfo{
  margin-bottom: 40px;
}
.infoName{
  font-weight: 600;
}
.persInfo .oneLineInfo .infoRight{
  float: right;
}
.goToEditData span{
  display: block;
  margin: auto;
  line-height: 40px;
  text-align: center;
  width: 110px;
  margin-bottom: 30px;
  cursor: pointer;
  border-radius: 2px;
  color: white;
  background: #005aab;
}
.goToEditData span:hover{
  background: #329af0;
}
.setBtnWrap span{
  display: block;
  margin: auto;
  line-height: 40px;
  text-align: center;
  width: 110px;
  margin-bottom: 30px;
  cursor: pointer;
  border-radius: 2px;
  color: white;
  background: #005aab;
}
.setBtnWrap span:hover{
  background: #329af0;
}
.baseInfo{
  margin-top: 40px;
  margin-bottom: 30px;
}
.baseInfo .info1{
  margin-left: 80px;
}
.baseInfo .info2{
  margin-left: 230px;
}
.baseInfo .info3{
  margin-left: 220px;
}
.editSetGetMoney{
  width: 630px;
  margin: auto;
  margin-top:30px;
}
.defaultCss{
  width: 100px;
  height: 100px;
  -webkit-box-shadow: 3px 3px 10px #ddd;  
  -moz-box-shadow: 3px 3px 10px #ddd;
  box-shadow: 3px 3px 10px #ddd;
  border-radius: 50%;
}
</style>
