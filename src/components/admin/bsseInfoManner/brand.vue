<template>
  <el-row class="warp classfy">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品基础资料管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品品牌管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col  class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="品牌名称：">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="产地">
            <el-select v-model="formInline.region">
              <el-option label="国产" value="国产"></el-option>
              <el-option label="进口" value="进口"></el-option>
            </el-select>
          </el-form-item><el-form-item>
            <el-button type="primary" @click="onSubmit()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="text-align:right;line-height:40px;">
        <el-button type="text" @click="dialogFormVisible = true">+添加商品分类</el-button>
      </el-col>


      <!--列表-->
      <el-table
          :data="tableData"
          border
          style="width: 100%">

          <el-table-column
            prop="name"
            align="center"
            label="品牌名称"
            >
          </el-table-column>
          <el-table-column
            prop="logo"
            align="center"
            label="logo">
            <template scope="scope">
              <img style="cursor: pointer;" v-on:click="asdfa(scope.$index)" :src="scope.row.logo" alt="点击查看大图" title="点击查看大图">
            </template>
          </el-table-column>
          <el-table-column
            prop="madein"
            align="center"
            label="产地">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template scope="scope">
            <el-button
              type="text"
              v-on:click="changeOneAttr(scope.$index)"
              >修改</el-button>
            <el-button
              type="text"
              v-on:click="DELEONE(scope.$index)"
              >删除</el-button>
          </template>
          </el-table-column>
    </el-table>
    </el-col>

    <!-- Form -->

    <el-dialog title="照片大图" :visible.sync="dialogFormVisible2">
      <img src="1.png" style="width:150px;height:150px">

</el-dialog>
    <el-dialog title="添加商品品牌" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="品牌名称：" :label-width="formLabelWidth">
          <el-input v-model="name" auto-complete="off"></el-input>
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
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOneAttrs">保存</el-button>
      </div>
    </el-dialog>
  </el-row>


</template>
<script>
  export default{
    data(){
      return {
        name:null,
        address:null,
        formLabelWidth:"120px",
         imageUrl: '',
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
        dialogFormVisible:false,
        dialogFormVisible2:false,
        formInline: {
            user: '',
            region: ''
          }
      }
    },

    methods: {
      dialogFormVisible2:function(index){

      },
      asdfa:function(index){
        console.log(index)
        this.dialogFormVisible2 = true;
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
      changeOneAttr:function(index){
        this.dialogFormVisible = true;
        var thisData = this.tableData[index];
        this.address = thisData.madein;
        this.name = thisData.name;
      },
      saveOneAttrs:function(){
        var obj = {};
        obj.madein = this.address;
        obj.name = this.name;
        obj.logo = "1.png";
        this.tableData.push(obj);
        this.dialogFormVisible  = false;
        this.madein = null;
        this.name = null;
      },


      // -----------------------------
    },
  }
</script>

<style scope="scope">
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
    cursor: pointer;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.classfy  .el-dialog__footer{
  margin-left: 120px;
  text-align: left;
  }
</style>
