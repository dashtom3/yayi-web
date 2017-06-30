<template>
  <div class="personalData">
    <div class="perDataLeft">
      <span>基础资料</span>
      <span>提现设置</span>
    </div>
    <div class="perDataRight">
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
        <el-form :label-position="right" label-width="80px" :model="personalData">
          <el-form-item label="手机号：">
            <el-input v-model="personalData.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="personalData.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="personalData.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="personalData.IDCode"></el-input>
          </el-form-item>
          <el-form-item label="微信号：">
            <el-input v-model="personalData.weixin"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="personalData.email"></el-input>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-input v-model="personalData.birthday"></el-input>
          </el-form-item>
          <el-form-item label="学历：">
            <el-input v-model="personalData.education"></el-input>
          </el-form-item>
          <el-form-item label="工作单位：">
            <el-input v-model="personalData.companyName"></el-input>
          </el-form-item>
          <el-form-item label="工作职位：">
            <el-input v-model="personalData.position"></el-input>
          </el-form-item>
          <el-form-item label="所在地省市区：">
            <el-input v-model="personalData.palce"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：">
            <el-input v-model="personalData.detailsPlace"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'personalData',
    data () {
      return {
        personalData:{
          phone:"",
          name:"",
          sex:"",
          IDCode:"",
          weixin:"",
          email:'',
          birthday:'',
          education:"",
          companyName:"",
          position:'',
          palce:"",
          detailsPlace:""
        }
      }
    },
    components: {

    },
    created: function() {
    },
    methods: {
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
.perDataLeft{
  float: left;
}
.perDataRight{
  margin-left: 130px;
  border: 1px solid #eeeeee;
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
}
</style>
