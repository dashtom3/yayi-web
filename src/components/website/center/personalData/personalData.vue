<template>
  <div class="personalData">
    <div class="content">
      <div class="changeUserImg">
        <label for="file1">更改头像<img class="loadUserImg" src="../../../../images/center/loadUserImg.png" alt=""></label>
        <input type="file" name="file1" id="file1" style="display:none">
      </div>
      <div class="mainContent">
        <el-form ref="userData" :model="userData" label-width="90px">
          <el-form-item label="用户名：">
            <el-input  v-model="userData.name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="userData.realyName"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="userData.sex">
              <el-radio  label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：">
            <el-input v-model="userData.birthday"></el-input>
          </el-form-item>
          <el-form-item label="qq：">
            <el-input v-model="userData.qq"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentTabs:1,
        userData:{
          name:"",
          realyName:"",
          sex:"男",
          birthday:"",
          qq:null,
        }
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
