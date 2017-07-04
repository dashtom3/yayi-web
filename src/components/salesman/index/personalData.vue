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
          <div class="headImgWrap">
            <label for="file1">
              <div class="imgWrap">
                <img src="" alt="">
              </div>
              上传头像
              <input type="file" name="file1" style="display:none" id="file1">
            </label>
          </div>
          <div class="persInfo">
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">手机号：</span>{{personalData.phone}}</span>
              <span class="infoRight"><span class="infoName">真实姓名：</span>{{personalData.name}}</span>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">性别：</span>{{personalData.sex}}</span>
              <span class="infoRight"><span class="infoName">身份证号：</span>{{personalData.IDCode}}</span>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">微信：</span>{{personalData.weixin}}</span>
              <span class="infoRight"><span class="infoName">邮箱：</span>{{personalData.email}}</span>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">出生日期：</span>{{personalData.birthday}}</span>
              <span class="infoRight"><span class="infoName">学历：</span>{{personalData.education}}</span>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">工作单位：</span>{{personalData.companyName}}</span>
              <span class="infoRight"><span class="infoName">工作职位：</span>{{personalData.position}}</span>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">所在地省市区：</span>{{personalData.palce}}</span>
            </div>
            <div class="oneLineInfo">
              <span class="infoLeft"><span class="infoName">详细地址：</span>{{personalData.detailsPlace}}</span>
            </div>
            <div class="goToEditData">
              <span @click="goToEditData()">编辑资料</span>
            </div>
          </div>
        </div>
        <div v-else class="edit">
          <div class="headImgWrap">
            <label for="file1">
              <div class="imgWrap">
                <img src="" alt="">
              </div>
              上传头像
              <input type="file" name="file1" style="display:none" id="file1">
            </label>
          </div>
          <div class="editPersonalData">
            <el-form :label-position="lablePosi"  label-width="150px"  :model="personalData" :rules="personalDataRule" ref="personalData">
              <el-form-item label="手机号：" prop="phone">
                <el-input v-model="personalData.phone" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名：" prop="name">
                <el-input v-model="personalData.name"></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="personalData.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="身份证号：" prop="IDCode">
                <el-input v-model="personalData.IDCode"></el-input>
              </el-form-item>
              <el-form-item label="微信号：" prop="weixin">
                <el-input v-model="personalData.weixin"></el-input>
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
              <el-form-item label="工作单位：" prop="companyName">
                <el-input v-model="personalData.companyName"></el-input>
              </el-form-item>
              <el-form-item label="工作职位：" prop="position">
                <el-input v-model="personalData.position"></el-input>
              </el-form-item>
              <el-form-item label="所在地省市区：" prop="palce">
                <positionPicker v-on:getMsgFromChildren="positionFromPicker"></positionPicker>
              </el-form-item>
              <el-form-item label="详细地址：" prop="detailsPlace">
                <el-input v-model="personalData.detailsPlace"></el-input>
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
    <!-- <div class="perDataRight">
      <div class="headImgWrap">
        <label for="file1">
          <div class="imgWrap">
            <img src="" alt="">
          </div>
          上传头像
          <input type="file" name="file1" style="display:none" id="file1">
        </label>
      </div>
      <div class="editPersonalData">
        <el-form :label-position="lablePosi"  label-width="150px"  :model="personalData" :rules="personalDataRule" ref="personalData">
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="personalData.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="name">
            <el-input v-model="personalData.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="personalData.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号：" prop="IDCode">
            <el-input v-model="personalData.IDCode"></el-input>
          </el-form-item>
          <el-form-item label="微信号：" prop="weixin">
            <el-input v-model="personalData.weixin"></el-input>
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
          <el-form-item label="工作单位：" prop="companyName">
            <el-input v-model="personalData.companyName"></el-input>
          </el-form-item>
          <el-form-item label="工作职位：" prop="position">
            <el-input v-model="personalData.position"></el-input>
          </el-form-item>
          <el-form-item label="所在地省市区：" prop="palce">
            <positionPicker v-on:getMsgFromChildren="positionFromPicker"></positionPicker>
          </el-form-item>
          <el-form-item label="详细地址：" prop="detailsPlace">
            <el-input v-model="personalData.detailsPlace"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveEditPersData('personalData')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div> -->
  </div>
</template>

<script>
  import positionPicker from "./positionSelect"
  export default {
    name: 'personalData',
    data () {
      return {
        lablePosi:"right",
        showPane:1,
        showDefaultData:true,
        getMoneySet:true,
        bindGetMoneyCount:{
          type:'支付宝',
          userName:"小酱",
          count:'13241341341'
        },
        getMoneyData:{
          type:"支付宝",
          name:"小将",
          bandCounet:"213414134",
          zhifubaoCounet:"13414",
          bandName:""
        },
        getMoneyDataRule:{
          name:{ required: true, message: '请填写真实姓名', trigger: 'change' },
          bandCounet:{required: true, message: '请填写银行账号', trigger: 'change'},
          bandName:{required: true, message: '请填写支银行名称', trigger: 'change'},
          zhifubaoCounet:{required: true, message: '请填写支付宝账号', trigger: 'change'}
        },
        personalData:{
          phone:"121121",
          name:"小酱",
          sex:"男",
          IDCode:"1234",
          weixin:"134",
          email:'134',
          birthday:'1993-02-01',
          education:"同济",
          companyName:"小酱",
          position:'小酱',
          palce:["上海","杨浦区"],
          detailsPlace:"同济大学"
        },
        personalDataRule:{
          name: [
            { required: true, message: '请填写真实姓名', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          IDCode: [
            { required: true, message: '请输入身份证号', trigger: 'change' }
          ],
          weixin: [
            { required: true, message: '请填写微信号', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请填写邮箱', trigger: 'change' }
          ],
          birthday: [
            { required: true, message: '请选择出生日期', trigger: 'blur' ,type:"date"}
          ],
          education: [
            { required: true, message: '请填写学历', trigger: 'change' }
          ],
          companyName: [
            { required: true, message: '请输入工作单位', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请输入工作职位', trigger: 'change' }
          ],
          palce: [
            { required: true, message: '请选择所在省市区', trigger: 'change',type:"array" }
          ],
          detailsPlace: [
            { required: true, message: '请填写详细地址', trigger: 'change' }
          ]
        },
      }
    },
    components: {
      positionPicker
    },
    created: function() {
    },
    methods: {
      saveEditGetMoeny:function(formName){
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            that.getMoneySet = true;
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      setGetMoney:function(){
        var that = this;
        that.getMoneySet = false;
      },
      goToEditData:function(){
        var that = this;
        that.showDefaultData = false;
      },
      changShowPane:function(arg){
        var that = this;
        that.showPane = arg;
      },
      positionFromPicker:function(data){
        var that = this;
        that.personalData.palce = data;
        console.log(that.personalData.palce)
      },
      saveEditPersData:function(formName){
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            that.showDefaultData = true;
          } else {
            alert('error submit!!');
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
  margin-top: 110px;
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
  margin-top: 100px;
}
.persInfo .oneLineInfo{
  margin-bottom: 40px;
}
.infoName{
  font-weight: 600;
}
.persInfo .oneLineInfo .infoRight{
  float: right
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
</style>
