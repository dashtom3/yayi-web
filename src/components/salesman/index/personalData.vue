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
              <img src="../../../images/center/loadUserImg.png"  style="cursor:auto;" class="defaultCss" v-if="!personalData.salePic">
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
              <span class="infoLeft"><span class="infoName">所在地省市区：</span>{{personalData.part}}</span>
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
              <img src="../../../images/center/loadUserImg.png" class="defaultCss" v-if="!personalData.salePic">
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
                <el-input v-model="personalData.trueName"></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="personalData.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="身份证号：" prop="idCard">
                <el-input v-model="personalData.idCard"></el-input>
              </el-form-item>
              <el-form-item label="微信号：" prop="weChar">
                <el-input v-model="personalData.weChar"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="personalData.email"></el-input>
              </el-form-item>
              <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker type="date" v-model="personalData.birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="学历：" prop="education">
                <el-input v-model="personalData.education"></el-input>
              </el-form-item>
              <el-form-item label="工作单位：" prop="workUnit">
                <el-input v-model="personalData.workUnit"></el-input>
              </el-form-item>
              <el-form-item label="工作职位：" prop="position">
                <el-input v-model="personalData.workPosition"></el-input>
              </el-form-item>
              <el-form-item label="所在地省市区：" prop="part">
                <positionPicker v-on:getMsgFromChildren="positionFromPicker" :selected="this.personalData.part"></positionPicker>
              </el-form-item>
              <el-form-item label="详细地址：" prop="address">
                <el-input v-model="personalData.address"></el-input>
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
                <span class="infoName">类型：</span>{{bindGetMoneyCount.type}}
              </span>
              <span class="info2">
                <span class="infoName">开户者：</span>{{bindGetMoneyCount.userName}}
              </span>
              <span class="info3">
                <span class="infoName">{{bindGetMoneyCount.type}}：</span>{{bindGetMoneyCount.count}}
              </span>
            </div>
            <div class="setBtnWrap">
              <span @click="setGetMoney()">设置</span>
            </div>
          </div>
          <div v-else>
            <div class="editSetGetMoney">
              <el-form :label-position="lablePosi"  label-width="150px"  :model="getMoneyData" :rules="getMoneyDataRule" ref="getMoneyData">
                <el-form-item label="类型：" prop="type">
                  <el-select v-model="getMoneyData.type">
                    <el-option label="支付宝" value="支付宝"></el-option>
                    <el-option label="银行" value="银行"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开户者：" prop="name">
                  <el-input v-model="getMoneyData.name"></el-input>
                </el-form-item>
                <el-form-item v-if="getMoneyData.type!=='支付宝'" label="银行：" prop="bandName">
                  <el-input v-model="getMoneyData.bandName"></el-input>
                </el-form-item>
                <el-form-item v-if="getMoneyData.type!=='支付宝'" label="银行账号：" prop="bandCounet">
                  <el-input v-model="getMoneyData.bandCounet"></el-input>
                </el-form-item>
                <el-form-item v-else label="支付宝账号：" prop="zhifubaoCounet">
                  <el-input v-model="getMoneyData.zhifubaoCounet"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveEditGetMoeny('getMoneyData')">保存</el-button>
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
    data () {
      return {
        lablePosi:"right",
        showPane:1,
        showDefaultData:true,
        getMoneySet:true,
        imageUrl: '',
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
        bindGetMoneyCount:{},
        getMoneyData:{},
        getMoneyDataRule:{
          name:{ required: true, message: '请填写真实姓名', trigger: 'change' },
          bandCounet:{required: true, message: '请填写银行账号', trigger: 'change'},
          bandName:{required: true, message: '请填写支银行名称', trigger: 'change'},
          zhifubaoCounet:{required: true, message: '请填写支付宝账号', trigger: 'change'}
        },
        personalData:{},
        personalDataRule:{
          trueName: [
            { required: true, message: '请填写真实姓名', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          idCard: [
            { required: true, message: '请输入身份证号', trigger: 'change' }
          ],
          weChar: [
            { required: true, message: '请填写微信号', trigger: 'change' }
          ]
        },
      }
    },
    computed: {
      sexShow: function(){
        return this.personalData.sex === 2 ? '女' : '男'
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
      this.queryPersonInfo()
    },
    methods: {
      fillZero: function(n){
        return n<10 ? '0'+ n: n 
      },
      queryPersonInfo: function(){
        let params = {
          phone: global.getSalesUser().phone,
          token: global.getSalesToken()
        }
        global.axiosGetReq('/saleInfo/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.personalData = res.data.data
            this.personalData.part = this.personalData.part && this.personalData.part.split(',')
            this.personalData.sex = res.data.data.sex || 1
            console.log(this.personalData)
          }
        })
      },
      saveEditGetMoeny:function(formName){
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let params
            if(this.getMoneyData.type === '支付宝'){
              params = {
                postalType: '支付宝',
                openName: this.getMoneyData.name,
                accountNumber: this.getMoneyData.zhifubaoCounet,
                token: global.getSalesToken()
              }
            }else if(this.getMoneyData.type === '银行'){
              params = {
                postalType: '银行',
                bankName: this.getMoneyData.bandName,
                openName: this.getMoneyData.name,
                accountNumber: this.getMoneyData.bandCounet,
                token: global.getSalesToken()
              }
            }
            global.axiosPostReq('/saleInfo/updatePostal',params).then((res) => {
              if(res.data.callStatus === 'SUCCEED'){
                this.$message({
                  message: '设置成功',
                  type: 'success'
                });
                that.queryPersonInfo();

                that.getMoneySet = true;
              }
            })
            
          } else {
            this.$alert('请填写完整的个人信息');
            return false;
          }
        });
      },
      setGetMoney:function(){
        var that = this;
        this.getMoneyData.type = this.personalData.postalType
        this.getMoneyData.name = this.personalData.openName
        this.getMoneyData.bandCounet = this.personalData.accountNumber
        this.getMoneyData.zhifubaoCounet = this.personalData.accountNumber
        this.getMoneyData.bandName = this.personalData.bankName
        that.getMoneySet = false;
      },
      goToEditData:function(){
        var that = this;
        this.personalData.sex = this.personalData.sex && this.personalData.sex.toString()
        that.showDefaultData = false;
      },
      changShowPane:function(arg){
        var that = this;
        this.bindGetMoneyCount.type = this.personalData.postalType
        this.bindGetMoneyCount.userName = this.personalData.openName
        this.bindGetMoneyCount.count = this.personalData.accountNumber
        that.showPane = arg;
      },
      positionFromPicker:function(data){
        var that = this;
        that.personalData.part = data;
      },
      uploadFile(res, file) {
        this.personalData.salePic = global.qiniuShUrl + file.response.key
        this.imageUrl = global.qiniuShUrl + file.response.key
      },
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
              part: (this.personalData.part).join(","),
              address: this.personalData.address,
              education: this.personalData.education,
              workUnit: this.personalData.workUnit,
              workPosition: this.personalData.workPosition,
              salePic: this.personalData.salePic,
              token: global.getSalesToken()
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
            this.$alert('请填写完整的个人信息');
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
  background: #5DB7E7;
  margin-bottom: 2px;
  cursor: pointer;
}
.perDataLeft .moreBlue{
background: #5ed6dc;
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
  background: #5DB7E7;
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
  background: #5DB7E7;
}
.baseInfo{
  margin-top: 40px;
  margin-bottom: 30px;
}
.baseInfo .info1{
  margin-left: 80px;
}
.baseInfo .info2{
  margin-left: 260px;
}
.baseInfo .info3{
  margin-left: 260px;
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
