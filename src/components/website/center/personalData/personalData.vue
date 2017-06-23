<template>
  <div class="personalData">
    <div class="content">
      <div class="changeUserImg">
        <label for="file1">更改头像<img id="img_up" class="loadUserImg" src="../../../../images/center/loadUserImg.png" alt=""></label>
        <input type="file" name="file1" id="file1" accept="image/png,image/gif" style="display:none">
      </div>
      <div class="mainContent">
        <el-form ref="userData" :model="userData" label-width="90px">
          <el-form-item label="用户名：">
            <el-input :disabled="true"  v-model="userData.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="userData.trueName"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="userData.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：">
            <el-input v-model="userData.birthday"></el-input>
          </el-form-item>
          <el-form-item label="qq：">
            <el-input v-model="userData.qq"></el-input>
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
        qiNiuToken: ''
      }
    },
    props: ["userData"],
    created(){
      // 获取七牛token
      global.getQiNiuToken()
      .then((res) => {
        this.qiNiuToken = {token: res.data.data}
      })
    },
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
    methods: {
      //编辑个人信息
      savePerInfo(){
        var params = {
          phone: global.getUser().phone,
          token: global.getToken(),
          trueName: this.userData.trueName,
          sex: this.userData.sex,
          birthday: this.userData.birthday,
          qq: this.userData.qq,
          userPic: '',
          type: 1,
          companyName: '',
          part: '',
          workAddress: '',
          doctorPic: ''
        }
        //保存个人信息
        global.axiosPostReq('/userPersonalInfo/update', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              message: '个人信息修改成功！',
              type: 'success'
            });
          }else{
            this.$message.error('个人信息修改失败！');
          }
        })
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
