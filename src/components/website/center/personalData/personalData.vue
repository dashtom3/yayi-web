<template>
  <div class="personalData">
    <div class="content">
      <div class="changeUserImg">
        <label for="file1">更改头像<img id="img_up" class="loadUserImg" src="../../../../images/center/loadUserImg.png" alt=""></label>
        <input type="file" name="file1" id="file1" accept="image/png,image/gif" style="display:none">
      </div>
      <div class="mainContent">
        <el-form ref="personData" :model="personData" label-width="90px">
          <el-form-item label="用户名：">
            <el-input :disabled="true" v-model="personData.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="personData.trueName"></el-input>
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
          </el-form-item>
          <el-form-item label="qq：">
            <el-input v-model="personData.qq"></el-input>
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
    props: ["userData"],  
    data () {
      return {
        currentTabs:1,
        qiNiuToken: '',
        trueName_validate: false,
        personData: {
          phone: global.getUser().phone,
          token: global.getToken(),
          trueName: this.userData.trueName || '',
          sex: this.userData.sex || '1',
          birthday: this.userData.birthday || '1970-01-01',
          qq: this.userData.qq || ''
        }//作为局部这个组件的data的初始值
      }
    },
    // mounted(){
    //   // 获取七牛token
    //   // global.getQiNiuToken()
    //   // .then((res) => {
    //   //   this.qiNiuToken = {token: res.data.data}
    //   // })
    // },
    mounted(){
      var filechooser = document.getElementById('file1');
      var previewer = document.getElementById('img_up');
      
      filechooser.onchange = function() {
          var file = this.files[0];
          // 接受 jpeg, jpg, png 类型的图片
          if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

          var reader = new FileReader();
          reader.onload = function() {
              var result = this.result;
              console.log(result);
              previewer.src = result;

              // 清空图片上传框的值
              filechooser.value = '';
          };

          reader.readAsDataURL(file);
      };
    },
    watch: {
      // userData: function(){
      //   var that = this;
      //   if(that.userData.trueName !== ''){
      //     that.trueName_validate = false;
      //   }
      // }
    },
    methods: {
      //编辑个人信息
      savePerInfo(){
        var localData = JSON.parse(localStorage.getItem('certData')) || {};
        var params = {
          phone: global.getUser().phone,
          token: global.getToken(),
          trueName: this.personData.trueName,
          sex: this.personData.sex,
          birthday: util.formatDate.format(new Date(this.personData.birthday)),
          qq: this.personData.qq,
          userPic: localData.userPic || '',
          type: localData.type || '',
          companyName: localData.companyName || '',
          part: localData.part || '',
          workAddress: localData.workAddress || '',
          doctorPic: localData.doctorPic || ''
        }
        //验证表单
        // if(this.userData.trueName == ''){
        //   this.trueName_validate = true;
        //   return false;
        // }
        //保存个人信息
        global.axiosPostReq('/userPersonalInfo/update', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            let personData = {
              trueName: this.personData.trueName,
              sex: this.personData.sex,
              birthday: util.formatDate.format(new Date(this.personData.birthday)),
              qq: this.personData.qq
            }
            localStorage.setItem('personData',JSON.stringify(personData));
            this.$message({
              message: '个人信息修改成功！',
              type: 'success'
            });
            // this.trueName_validate = false;
          }else{
            this.$message.error('个人信息修改失败！');
          }
        })
        this.$emit('listentoChild',this.userData);
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
.changeUserImg{
  margin-top: 40px;
  margin-bottom: 53px;
  text-align: center;
  position: relative;
}
.error {
  position: absolute;
  left: 20px;
  font-size: 14px;
  color: #D81E06;
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
  background-color: #5db7e8;
  border-color: #5db7e8;
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
  top: -140px;
  left: 50%;
  width: 150px;
  height: 150px;
  cursor: pointer;
  transform: translateX(-50%);
}


















</style>
