<template>
  <el-row class="brandWarp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>商品基础资料管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>商品品牌管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="品牌名称：">
            <el-input v-model="searchBranName"></el-input>
          </el-form-item>
          <el-form-item label="产地：">
            <el-select v-model="searchBranPlace">
              <el-option label="国产" value="国产"></el-option>
              <el-option label="进口" value="进口"></el-option>
            </el-select>
          </el-form-item><el-form-item>
            <el-button type="primary" @click="onSubmit()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="text-align:right;line-height:40px;">
        <el-button type="text" @click="addGoodBrand()">+添加商品品牌</el-button>
      </el-col>


      <!--列表-->
        <el-table  :data="tableData"  border  style="width: 100%">
          <el-table-column  prop="name"  align="center"    label="品牌名称"  >  </el-table-column>
          <el-table-column  prop="logo"  align="center"  label="logo">
            <template scope="scope">
              <img style="cursor: pointer;" v-on:click="showBigImg(scope.$index)" :src="scope.row.logo" alt="点击查看大图" title="点击查看大图">
            </template>
          </el-table-column>
          <el-table-column  prop="madein"  align="center"  label="产地">  </el-table-column>
          <el-table-column  align="center"  label="操作">
            <template scope="scope">
              <el-button  type="text"  v-on:click="changeOneBrand(scope.$index)"  >修改</el-button>
              <el-button  type="text"  v-on:click="DELEONE(scope.$index)"  >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-col>

    <!-- Form -->

    <el-dialog title="照片大图" :visible.sync="ifShowBigImg">
      <img src="1.png" style="width:350px;height:350px;display:block;margin:auto;">
    </el-dialog>
    <el-dialog :title="bindTitle" :visible.sync="showAddBrandAlert">
      <el-form>
        <el-form-item label="品牌名称：" :label-width="formLabelWidth">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="产地：" :label-width="formLabelWidth">
          <el-select v-model="address">
            <el-option label="国产" value="国产"></el-option>
            <el-option label="进口" value="进口"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="logo：" :label-width="formLabelWidth">
          <el-upload
            :on-success="handleAvatarSuccess"
            action=""
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOneBrand()">保存</el-button>
      </div>
    </el-dialog>
  </el-row>


</template>
<script>
  export default{
    data(){
      return {
        bindTitle:null,
        searchBranName:null,
        searchBranPlace:null,
        // 1增加。2修改
        brandOperaType:1,
        changeOneIndex:null,
        name:null,
        address:null,
        formLabelWidth:"120px",
         imageUrl: null,
        tableData:[
          {name:"sdfg",logo:"qwerfqew",madein:"国产"},
          {name:"sdfg",logo:"qwerfqew",madein:"进口"},
          {name:"sdfg",logo:"qwerfqew",madein:"国产"},
          {name:"sdfg",logo:"qwerfqew",madein:"进口"},
          {name:"sdfg",logo:"qwerfqew",madein:"国产"},
          {name:"sdfg",logo:"qwerfqew",madein:"进口"},
          {name:"sdfg",logo:"qwerfqew",madein:"国产"},
          {name:"sdfg",logo:"qwerfqew",madein:"进口"},
        ],
        showAddBrandAlert:false,
        ifShowBigImg:false,
      }
    },

    methods: {
      handleAvatarSuccess(res, file) {

      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      addGoodBrand:function(){
        this.bindTitle = "添加商品品牌";
        this.name = null;
        this.address = null;
        this.showAddBrandAlert = true;
        this.brandOperaType = 1;
      },
      showBigImg:function(index){
        this.ifShowBigImg = true;
      },
      DELEONE:function(index){
        this.$confirm('确定删除该属性吗, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.tableData.splice(index,1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      changeOneBrand:function(index){
        this.bindTitle = "修改商品品牌";
        this.showAddBrandAlert = true;
        var thisData = this.tableData[index];
        this.address = thisData.madein;
        this.name = thisData.name;
        this.changeOneIndex = index;
        this.brandOperaType = 2;
      },
      saveOneBrand:function(){
        if(this.brandOperaType==1){
          var obj = {};
          obj.madein = this.address;
          obj.name = this.name;
          obj.logo = "1.png";
          this.tableData.push(obj);
          this.madein = null;
          this.name = null;
          this.searchBranName = null;
          this.searchBranPlace = null;
        }
        if(this.brandOperaType==2){
          this.tableData[this.changeOneIndex].madein = this.address;
          this.tableData[this.changeOneIndex].name = this.name;
        }
        this.showAddBrandAlert  = false;
      },
    },
  }
</script>

<style>
.brandWarp .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.brandWarp   .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
.brandWarp  .avatar-uploader-icon {
    font-size: 28px;
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
.brandWarp   .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
