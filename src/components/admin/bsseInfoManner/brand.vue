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
            <el-input v-model="itemBrandName"></el-input>
          </el-form-item>
          <el-form-item label="产地：">
            <el-select v-model="itemBrandHome">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryHandler">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col style="text-align:right;line-height:40px;">
        <el-button type="primary" class="add_btn" @click="addGoodBrand()">+添加商品品牌</el-button>
      </el-col>


      <!--列表-->
        <el-table  :data="tableData"  border  style="width: 100%">
          <el-table-column  prop="itemBrandName" align="center" label="品牌名称"></el-table-column>
          <el-table-column  prop="itemBrandLogo"  align="center"  label="logo">
            <template scope="scope">
              <img style="cursor: pointer;width:32px;height:32px;vertical-align:middle;" v-on:click="showBigImg(scope.$index)" :src="tableData[scope.$index].itemBrandLogo" alt="点击查看大图" title="点击查看大图">
            </template>
          </el-table-column>
          <el-table-column  prop="itemBrandHome"  align="center"  label="产地">  </el-table-column>
          <el-table-column  align="center"  label="操作">
            <template scope="scope">
              <el-button  type="text"  v-on:click="changeOneBrand(scope.$index)">修改</el-button>
              <el-button  type="text"  v-on:click="DELEONE(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="position:absolute;top:650px;right:0;" v-show="this.totalCount > this.pagesize">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
    </el-col>
    <div class="clearfix"></div>

    <!-- Form -->

    <el-dialog title="照片大图" :visible.sync="ifShowBigImg">
      <img :src="bigImgSrc" style="width:350px;height:350px;display:block;margin:auto;">
    </el-dialog>
    <el-dialog :title="bindTitle" size="tiny" :visible.sync="showAddBrandAlert">
      <el-form>
        <el-form-item label="品牌名称：" :label-width="formLabelWidth">
          <el-input v-model="itemBrandNameAdd" class="item_w_input fl"></el-input>
        </el-form-item>
        <el-form-item label="产地：" :label-width="formLabelWidth">
          <el-select v-model="itemBrandHomeAdd">
            <el-option label="国产" value="国产"></el-option>
            <el-option label="进口" value="进口"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="logo：" :label-width="formLabelWidth">
          <el-upload
            :on-success="uploadFile"
            :action="qiNiuUrl"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            :show-file-list="false"
            :data="qiNiuToken">
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
  import global from '../../global/global'
  export default{
    data(){
      return {
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '国产',
          label: '国产'
        }, {
          value: '进口',
          label: '进口'
        }],
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1000,
        value: '',
        bindTitle:null,
        itemBrandId: null,
        itemBrandName:null,
        itemBrandHome:'',
        itemBrandLogo:null,
        // 1增加。2修改
        brandOperaType:1,
        formLabelWidth:"120px",
        imageUrl: null,
        tableData:[],
        qiNiuToken: null,
        itemBrandNameAdd: null,
        itemBrandHomeAdd: null,
        itemBrandLogoAdd: null,
        qiNiuUrl: global.qiNiuUrl,
        showAddBrandAlert:false,
        ifShowBigImg:false,
        bigImgSrc: null
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
      this.queryHandler();//初始化请求
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val 
        this.queryHandler(val)
      },
      uploadFile(res, file) {
        this.itemBrandLogoAdd = global.qiniuShUrl + file.response.key
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
      },
      queryHandler: function(val){
        if (val == undefined || typeof(val) == 'object') {
          this.currentPage = 1
        } else {
          this.currentPage = val
        }
        let params = {
          itemBrandName: this.itemBrandName,
          itemBrandHome: this.itemBrandHome,
          currentPage: this.currentPage,
          numberPerPage: this.pagesize
        }
        global.axiosPostReq('/item/queryItemBrand',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.tableData = res.data.data;
            this.totalCount = res.data.totalNumber;
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      addGoodBrand:function(){
        this.bindTitle = "添加商品品牌";

        this.itemBrandNameAdd = null;
        this.itemBrandHomeAdd = null;
        this.itemBrandLogoAdd = null;
        this.showAddBrandAlert = true;
        this.imageUrl = null;
        this.brandOperaType = 1;
      },
      showBigImg:function(index){
        this.ifShowBigImg = true;
        this.bigImgSrc = this.tableData[index].itemBrandLogo;
      },
      DELEONE:function(index){
        var that = this;
        this.$confirm('确定删除该品牌吗, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            itemBrandId: that.tableData[index].itemBrandId
          }
          global.axiosPostReq('/item/deleteItemBrand',params).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.$message({
                message: '删除成功',
                type: 'success'
              });
              that.queryHandler();
            }else{
              that.$message.error('该品牌下已有商品，不能删除！');
            }
          })
        }).catch(() => {
          
        });

      },
      changeOneBrand:function(index){
        this.bindTitle = "修改商品品牌";
        this.showAddBrandAlert = true;
        var thisData = this.tableData[index];
        this.itemBrandHomeAdd = thisData.itemBrandHome;
        this.itemBrandNameAdd = thisData.itemBrandName;
        this.itemBrandLogoAdd = thisData.itemBrandLogo;
        this.itemBrandId = thisData.itemBrandId;
        this.imageUrl = this.itemBrandLogoAdd;
        this.brandOperaType = 2;

      },
      saveOneBrand:function(){
        var that = this;
        //增加商品品牌
        if(this.brandOperaType==1){
          let params = {
            itemBrandName: this.itemBrandNameAdd,
            itemBrandHome: this.itemBrandHomeAdd,
            itemBrandLogo: this.itemBrandLogoAdd
          }
          //验证是否填写品牌名称
          if(!this.itemBrandNameAdd){
            this.$message.error('请填写品牌名称！');
            return false;
          }

          //验证是否选择产地
          if(!this.itemBrandHomeAdd){
            this.$message.error('请选择品牌产地');
            return false;
          }

          //验证是否上传图片
          if(!this.itemBrandLogoAdd){
            this.$message.error('请上传品牌LOGO');
            return false;
          }
          global.axiosPostReq('/item/addItemBrand',params).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              this.$message({
                message: '商品品牌添加成功',
                type: 'success'
              });
              that.queryHandler();
            }else{
              this.$message.error('网络出错，请稍后再试！');
            }
          })
        }
        //修改商品信息
        if(this.brandOperaType==2){
          var params = {
            itemBrandId: this.itemBrandId,
            itemBrandName: this.itemBrandNameAdd,
            itemBrandHome: this.itemBrandHomeAdd,
            itemBrandLogo: this.itemBrandLogoAdd
          }
          global.axiosPostReq('/item/updateItemBrand',params).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              this.$message({
                message: '商品品牌修改成功',
                type: 'success'
              });
              that.queryHandler();
            }else{
              this.$message.error('网络出错，请稍后再试！');
            }
          })
        }
        this.showAddBrandAlert  = false;
      },
    },
  }
</script>

<style>
.clearfix{
  zoom:1;
}
.clearfix:after{
  content:"";
  clear:both;
  display:block;
}
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
.add_btn{
  float:right;
  margin: 20px 118px 20px 0;
}
.item_w_input{
  width: 216px;
}
</style>
