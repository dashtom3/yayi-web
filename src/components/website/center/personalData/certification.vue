<template>
  <div class="certification">
    <div class="content">
      <el-form ref="certiData" :model="certiData" label-width="250px">
        <el-form-item label="类型：">
          <el-select v-model="certiData.type" :change="adsf(certiData.type)">
            <el-option label="个人" value="1"></el-option>
            <el-option label="企业" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="certiData.companyName"></el-input>
        </el-form-item>
        <el-form-item label="单位所在地：">
          <selectThree @listenToChild="showFromChild" :selected="this.certiData.part"></selectThree>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="certiData.workAddress"></el-input>
        </el-form-item>
        <el-form-item :label="sczgz">
          <el-upload
          class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePerInfo">保存</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import selectThree from "../../details/selectThree"
  import global from '../../../global/global'
  export default {
    name: 'certification',
    props:["state","userData"],
    data () {
      return {
        // 1,ing-----2,false
        certificateState:0,
        sczgz:"口腔执业医师资格证：",
        imageUrl: '',
        certiData: {
          phone: global.getUser().phone,
          token: global.getToken(),
          trueName: this.userData.trueName || '',
          sex: this.userData.sex || '1',
          birthday: this.userData.birthday || '1970-01-01',
          qq: this.userData.birthday || '',
          userPic: this.userData.userPic || '',
          type: this.userData.type || '1',
          companyName: this.userData.companyName || '',
          part: this.userData.part || ['北京','北京市','东城区'],
          workAddress: this.userData.workAddress || '',
          doctorPic: this.userData.doctorPic || ''
        } //作为局部这个组件的data的初始值
      }
    },
    components:{
      selectThree
    },
    watch:{
      state:function(){
        if(this.state==2){
          this.ert();
        }
      }
    },
    methods:{
      //编辑个人信息
      savePerInfo(){
        var localData = JSON.parse(localStorage.getItem('personData')) || {};
        var params = {
          phone: global.getUser().phone,
          token: global.getToken(),
          trueName: localData.trueName || '',
          sex: localData.sex || '',
          birthday: localData.birthday || '',
          qq: localData.qq || '',
          userPic: '',
          type: this.certiData.type,
          companyName: this.certiData.companyName,
          part: (this.certiData.part).join(","),
          workAddress: this.certiData.workAddress,
          doctorPic: this.certiData.imageUrl
        }
        //保存个人信息
        global.axiosPostReq('/userPersonalInfo/update', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            let certData = {
              userPic: '',
              type: this.certiData.type,
              companyName: this.certiData.companyName,
              part: (this.certiData.part).join(","),
              workAddress: this.certiData.workAddress,
              doctorPic: this.certiData.imageUrl
            }

            localStorage.setItem("certData",JSON.stringify(certData));
            this.$message({
              message: '个人信息修改成功！',
              type: 'success'
            });
          }else{
            this.$message.error('个人信息修改失败！');
          }
        })
      },
      showFromChild(data){
        this.certiData.part =  data;
      },
      adsf:function(aa){
        if(aa=="个人"){
          this.sczgz = "口腔执业医师资格证：";
        }else{
          this.sczgz = "营利性医疗机构执业许可证：";
        }
      },
      ert:function(){
        if(this.certificateState==1){
          this.$alert('您的认证信息我们会尽快审核，请耐心等待~',{
          confirmButtonText: '确定',
        });
        }else if(this.certificateState==2){
          this.$alert('抱歉，您的认证信息审核不通过，原因~',{
          confirmButtonText: '确定',
        });
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.content{
  padding-top: 40px;
margin-top: 30px;
margin-left: 44px;
margin-right: 50px;
width: 970px;
border: 1px solid #eeeeee;
border-radius: 3px;
}
</style>
<style>
.certification  form{
}
.certification  form .el-input{
  width: 240px;
  height: 40px;
  margin-left: 12px;
}
.certification .el-form-item{
  margin-bottom: 40px;
}
.certification .el-button--primary{
  margin-left: 268px ;
  background-color: #5db7e8;
  border-color: #5db7e8;
  width: 160px;
  line-height: 42px;
  padding: 0;
  margin-top: 20px;
}
.certification form .el-select input{
  width: 169px;
  padding-right: 19px;
}
.certification  form .el-form-item:nth-child(1) input{
  width: 240px;
}
.certification  form .el-form-item:nth-child(4) input{
  width: 549px;
}
.certification  .avatar-uploader-icon{
  border: 1px solid #bfcbd9;
  width: 120px;
height: 120px;
line-height: 120px;
}
.certification  .avatar-uploader{
  padding-left: 18px;
}
 .certification .el-cascader__label{
  margin-left: 15px;
}
.el-select-dropdown{
  min-width: 240px !important;
}
</style>
