<template>
  <div class="certification">
    <div class="content">
      <el-form :model="certiData" label-width="250px">
        <el-form-item label="类型：">
          <el-select v-model="certiData.type" :change="adsf(certiData.type)" :disabled="ifPass">
            <el-option label="个人" value="1"></el-option>
            <el-option label="企业" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="certiData.companyName" :disabled="ifPass"></el-input>
          <transition name="shake">
            <p v-show="companyName_validate" class="error">请输入真实的单位名称</p>
          </transition>
        </el-form-item>
        <el-form-item label="单位所在地：">
          <selectThree @listenToChild="showFromChild" :selected="this.certiData.part" v-show="!ifPass"></selectThree>
          <template>  
            <el-input v-model="partStr" :disabled="ifPass" v-if="ifPass"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="certiData.workAddress" :disabled="ifPass"></el-input>
        </el-form-item>
        <el-form-item :label="sczgz">
          <el-upload
          class="avatar-uploader"
            :disabled="ifPass"
            :action="qiNiuUrl"
            :show-file-list="false"
            :on-success="uploadFile"
            :before-upload="beforeAvatarUpload"
            :data="qiNiuToken">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" >
            <i class="el-icon-plus avatar-uploader-icon" v-if="!certiData.doctorPic"></i>
          </el-upload>
          <transition name="shake">
            <p v-show="doctorPic_validate" class="error">请上传真实的资格证书</p>
          </transition>
          <transition name="shake">
            <p v-show="audited_validate" class="adopt">资质审核通过！</p>
          </transition>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePerInfo" v-show="btnVisible">提交</el-button>
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
        certificateState:0,//认证状态
        companyName_validate: false,
        doctorPic_validate: false,
        sczgz:"口腔执业医师资格证：",
        imageUrl: this.userData.doctorPic || '',
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
        btnVisible: true,
        ifPass: false,
        audited_validate: false,
        partStr: '',
        certiData: {
          phone: global.getUser().phone,
          token: global.getToken(),
          type: this.userData.type || '1',
          companyName: this.userData.companyName || '',
          part: this.userData.part || ['北京','北京市','东城区'],
          workAddress: this.userData.workAddress || '',
          doctorPic: this.userData.doctorPic || '',
          ifOnce: this.userData.judge || 0
        } //作为局部这个组件的data的初始值
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
    },
    components:{
      selectThree
    },
    watch:{
      state:function(){
        if(this.state == 2){
          this.certificateState = this.userData.state;
          this.ert(this.certiData.failReason);
        }
      },
      ifPass: function(){
        if(this.ifPass){
          this.partStr = this.certiData.part.join('/')
        }
      },
      certiData: {
        handler: function(){
          if(this.certiData.companyName){
            this.companyName_validate = false
          }
          if(this.certiData.doctorPic){
            this.doctorPic_validate = false
          }
        },
        deep: true
      }
    },
    methods:{
      saveJudge(){
        var params = {
          phone: global.getUser().phone,
          token: global.getToken(),
          type: this.certiData.type,
          companyName: this.certiData.companyName,
          part: (this.certiData.part).join(","),
          workAddress: this.certiData.workAddress,
          doctorPic: this.imageUrl,
          judge: this.certiData.ifOnce
        }
        //保存个人信息
        global.axiosPostReq('/userPersonalInfo/updateCertification', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.ifPass = true;
            this.btnVisible = false;
          }
        })
      },
      //编辑个人信息
      savePerInfo(){
        var params = {
          phone: global.getUser().phone,
          token: global.getToken(),
          type: this.certiData.type,
          companyName: this.certiData.companyName,
          part: (this.certiData.part).join(","),
          workAddress: this.certiData.workAddress,
          doctorPic: this.imageUrl,
          judge: this.certiData.ifOnce
        }

        //验证单位名称必输
        if(!this.certiData.companyName){
          this.companyName_validate = true;
          return false;
        }
        //验证医师资格证书必输
        if(!this.certiData.doctorPic){
          this.doctorPic_validate = true;
          return false;
        }
        //编辑资质认证前需先完成个人信息验证
        if(!this.userData.trueName){
          this.$message.error('请先完善个人信息部分！');
        }
        //保存个人信息
        global.axiosPostReq('/userPersonalInfo/updateCertification', params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.$message({
              message: '您的认证信息我们会尽快审核，请耐心等待~',
              type: 'success'
            });
            this.ifPass = true;
            this.btnVisible = false;

          }else{
            this.$message.error('资质认证修改失败！');
          }
        })
      },
      showFromChild(data){
        this.certiData.part =  data;
      },
      adsf:function(aa){
        if(aa=="1"){
          this.sczgz = "口腔执业医师资格证：";
        }else{
          this.sczgz = "营利性医疗机构执业许可证：";
        }
      },
      ert:function(msg){
        if(this.certificateState==1 && this.certiData.ifOnce===0){
          this.$confirm('您的认证信息我们会尽快审核，请耐心等待~',{
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              //提交后台改变状态
              this.certiData.ifOnce = 1;
              this.saveJudge();
            }
          })
          this.ifPass = true;
          this.btnVisible = false;
        }else if(this.certificateState==1 && this.certiData.ifOnce===1){
          this.ifPass = true;
          this.btnVisible = false;
        }else if(this.certificateState==2 && this.certiData.ifOnce===0){
          this.$confirm('您的认证信息已审核通过',{
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              //提交后台改变状态
              this.certiData.ifOnce = 1;
              this.saveJudge();
            }
          })
          this.ifPass = true;
          this.btnVisible = false;
        }else if(this.certificateState==2 && this.certiData.ifOnce===1){
          this.ifPass = true;
          this.btnVisible = false;
          this.audited_validate = true;
        }else if(this.certificateState==3 && this.certiData.ifOnce===0){
          this.$confirm('抱歉，您的认证信息审核不通过，原因：'+ msg +',请重新填写！',{
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              //提交后台改变状态
              this.certiData.ifOnce = 1;
              this.saveJudge();
            }
          })
          this.ifPass = false;
          this.btnVisible = true;
        }else{
          this.ifPass = false;
          this.btnVisible = true;
        }
      },
      uploadFile(res, file) {
        this.certiData.doctorPic = global.qiniuShUrl + file.response.key
        this.imageUrl = global.qiniuShUrl + file.response.key
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
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
  .error {
    position: absolute;
    left: 20px;
    font-size: 14px;
    color: #D81E06;
  }
  .adopt{
    position: absolute;
    left: 20px;
    font-size: 14px;
    color: #56bff8;
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
  margin-left: 168px ;
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
