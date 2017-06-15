<template>
  <div class="certification">
    <div class="content">
      <el-form ref="userData" :model="userData" label-width="250px">
        <el-form-item label="类型：">
          <el-select v-model="userData.type" placeholder="" :change="adsf(userData.type)">
            <el-option label="个人" value="个人"></el-option>
            <el-option label="企业" value="企业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称：">
          <el-input v-model="userData.compony"></el-input>
        </el-form-item>
        <el-form-item label="单位所在地：">
          <!-- <el-select v-model="userData.type" placeholder="请选择省份">
            <el-option label="个人" value="shanghai"></el-option>
            <el-option label="企业" value="beijing"></el-option>
          </el-select>
          <el-select v-model="userData.type" placeholder="请选择市">
            <el-option label="个人" value="shanghai"></el-option>
            <el-option label="企业" value="beijing"></el-option>
          </el-select>
          <el-select v-model="userData.type" placeholder="请选择区">
            <el-option label="个人" value="shanghai"></el-option>
            <el-option label="企业" value="beijing"></el-option>
          </el-select> -->
          <selectThree></selectThree>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="userData.detailPlace"></el-input>
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
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import selectThree from "../../details/selectThree"
  export default {
    name: 'certification',
    data () {
      return {
        // 1,ing-----2,false
        certificateState:0,
        sczgz:"口腔执业医师资格证：",
        imageUrl: '',
        userData:{
          place:"",
          type:"个人",
          compony:"",
          detailPlace:"",
          zgz:null,
        }
      }
    },
    props:["state"],
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
