<template>
  <div class="personalData">
    <div class="content">  
      <div class="mainContent">
        <el-form ref="personData" :model="personData" label-width="90px">
          <el-form-item style="margin: -78px 0 0 38px;">
            <el-upload
              class="avatar-uploader"
              :action="qiNiuUrl"
              :show-file-list="false"
              :on-success="uploadFile"
              :data="qiNiuToken">
              <img v-if="imageUrl" :src="imageUrl" class="avatar defaultCss">
              <img src="../../../../images/center/loadUserImg3.png" class="defaultCss" v-if="!personData.userPic">
              <div class="changeImg">更改头像</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input :disabled="true" v-model="personData.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model.trim="personData.trueName"></el-input>
            <transition name="shake">
              <p v-show="trueName_validate" class="error">请输入真实的姓名</p>
            </transition>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="personData.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：">
            <el-date-picker
              v-model="personData.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <transition name="shake">
              <p v-show="birthDay_validate" class="error">请选择您的生日</p>
            </transition>
          </el-form-item>
          <el-form-item label="QQ：">
            <el-input v-model.trim="personData.qq"></el-input>
            <transition name="shake">
              <p v-show="qq_validate" class="error">请输入正确的QQ号</p>
            </transition>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="savePerInfo">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import global from '../../../global/global'
  import util from '../../../../common/util'
  export default {  
    data () {
      return {
        currentTabs:1,
        trueName_validate: false,
        birthDay_validate: false,
        qq_validate: false,
        imageUrl: '',
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
        //作为局部这个组件的data的初始值
        personData: {
          phone: global.getUser().phone,
          userPic: '',
          trueName: '',
          sex: '1',
          birthday: '',
          qq: '',
        }
      }
    },
    created(){
      //获取七牛token
      global.axiosGetReq('/file/getUpToken', null).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          this.qiNiuToken = {
            token: res.data.msg
          }
        }
      })
      this.init()
    },
    watch: {
      personData: {
        handler: function(){
          if(this.personData.trueName){
            this.trueName_validate = false
          }
          if(this.personData.birthday){
            this.birthDay_validate = false
          }
          if(this.personData.qq){
            this.qq_validate = false
          }
        },
        deep: true
      }
    },
    methods: {
      //查询个人信息
      init(){
        var obj = {
          phone: global.getUser().phone,
          token: global.getToken()
        }
        //查询个人信息
        global.axiosGetReq('/userPersonalInfo/detail', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.personData.trueName = res.data.data.trueName
            this.personData.birthday = res.data.data.birthday && util.formatDate.format(new Date(res.data.data.birthday))
            this.personData.sex = res.data.data.sex && res.data.data.sex.toString() || '1'
            this.personData.qq = res.data.data.qq
            this.personData.userPic = res.data.data.userPic
            this.imageUrl = res.data.data.userPic
          }
        })
      },
      //编辑个人信息
      savePerInfo(){
        var params = {
          phone: global.getUser().phone,
          token: global.getToken(),
          trueName: this.personData.trueName,
          sex: this.personData.sex,
          birthday: util.formatDate.format(new Date(this.personData.birthday)),
          qq: this.personData.qq,
          userPic: this.imageUrl
        }
        
        //验证真实姓名必输
        if(!this.personData.trueName){
          this.trueName_validate = true;
          return false;
        }
        //验证生日必输
        if(!this.personData.birthday){
          this.birthDay_validate = true;
          return false;
        }
        //验证QQ
        if(this.personData.qq && (!/^[1-9][0-9]{4,10}$/.test(this.personData.qq))){
          this.qq_validate = true;
          return false;
        }
        //保存个人信息
        global.axiosPostReq('/userPersonalInfo/updateUser', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              message: '个人信息修改成功！',
              type: 'success'
            });
          }
        })
      },
      uploadFile(res, file) {
        this.personData.userPic = global.qiniuShUrl + file.response.key
        this.imageUrl = global.qiniuShUrl + file.response.key
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.personalData{
  font-size: 14px;
}
.content{
  margin-top: 100px;
  margin-left: 44px;
  margin-right: 50px;
  width: 970px;
  border: 1px solid #eeeeee;
  border-radius: 3px;
}
.changeImg{
  margin-top: -12px;
}
.changeImg:hover{
  color: #005aab;
}
.error {
  position: absolute;
  left: 20px;
  font-size: 14px;
  color: #D81E06;
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
<style>
.personalData .mainContent  form{
  margin: 0 310px;
}
.personalData .mainContent  form .el-input{
  width: 260px;
  height: 40px;
      margin-left: 12px;
}
.personalData .mainContent .el-form-item{
  margin-bottom: 40px;
}
.personalData .mainContent .el-form-item__label{
  /*padding-right: 32px;*/
}
.personalData .mainContent .el-radio-group{
  padding-left: 12px;
}
.personalData .mainContent .el-button--primary{
  margin-left: 12px ;
  background-color: #005aab;
  border-color: #005aab;
  width: 160px;
  line-height: 42px;
  padding: 0;
  margin-top: 20px;
}
.personalData .mainContent .el-form-item:nth-child(5){
  margin-bottom: 30px;
}
.loadUserImg{
  position: absolute;
  top: -150px;
  left: 50%;
  width: 150px;
  height: 150px;
  cursor: pointer;
  transform: translateX(-50%);
}
</style>
