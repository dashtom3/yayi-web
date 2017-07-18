<template>
  <div class="thirdStep" v-show="thirdStep">
    <div class="firstTitle">商品图片：(最多5个)</div>
    <el-upload class="upload-demo" :on-remove="handleRemove" :on-success="uploadFile" :data="qiNiuToken" :action="qiNiuUrl" :file-list="fileList2" list-type="picture" :disabled="enoughImg">
      <el-button size="small" type="primary" :disabled="enoughImg">添加图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="clearfix"></div>
    <div class="second_box">
      <div class="secondTitle">商品详情：</div>
      <div id="toolbar1">
        <select class="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
          <button class="ql-Image" @click="uploaImage">image</button>
      </div>
      <div id="editor1" style="height:500px;"></div>
    </div>
    <div class="third_box">
      <div class="thirdTitle">图片说明：</div>
        <div id="toolbar2">
          <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
            <button class="ql-Image" @click="uploaImage1">image</button>
        </div>
        <div id="editor2" style="height:500px;"></div>
     <!--  <div id="editor" type="text/plain" style="width: 100%; height: 500px;"></div> -->
<!--     <button @click="submits">保存</button>  -->
<!--       <vue-editor id="editor2" v-model="thirdForm.itemUse"></vue-editor> -->
    </div>
    <div class="fouth_box">
      <div class="fouthTitle">视频说明：</div>
        <el-select v-model="thirdForm.video" filterable placeholder="请选择" class="selectTv">
          <el-option v-for="item in options" :key="item.vidRoute" :label="item.vidName" :value="item.vidRoute">
          </el-option>
        </el-select>
    </div>
    <div class="clearfix"></div>
    <div style="margin-left: 30px; margin-top:50px;">
      <el-button type="primary" @click="save()">保存</el-button>
      <el-button @click="returnSecond()">返回</el-button>
    </div>
    <el-dialog title="上传图片" :visible.sync="dialogVisible" size="small">
      <el-upload class="avatar-uploader" :data="qiNiuToken" :action="qiNiuUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertImg">插入图片</el-button>
      </span>
    </el-dialog>  
  </div>
</template>
<script>
  import global from '../../global/global' 
  import axios from 'axios'
  export default{
    name: 'thirdStep',
    props: ['message'],
    data() {
      return {
        fileList2: [],
        fileList: [],
        thirdForm: {
          itemPica: '',
          itemPicb: '',
          itemPicc: '',
          itemPicd: '',
          itemPice: '',
          itemDesc: '',
          itemUse: '',
          video: '',
        },
        options: [],
        thirdStep: true,
        qiNiuToken: {},
        qiNiuUrl: global.qiNiuUrl,
        dialogVisible: false,
        imageUrl: '',
        fwb: '',
        state: null,
        enoughImg: false,
      }
    },
    watch: {
      fileList: function() {
        var that = this
        if (that.fileList.length == 5) {
          that.enoughImg = true
        } else {
          that.enoughImg = false
        }
      },
      fileList2: function() {
        var that = this
        for (var i = 0; i < that.fileList2.length; i++) {
          var img_src = that.fileList2[i].url
          that.fileList.push(img_src)
        }
      }
    },
    created: function() {
      var that = this;
      that.editCargo = JSON.parse(window.sessionStorage.getItem('editCargo'))
      if (that.editCargo !== null) {
        if (that.editCargo.itemDetail.itemPica !== null) {
          var obj1 = {
            url: that.editCargo.itemDetail.itemPica
          }
          that.fileList2.push(obj1)
        }
        if (that.editCargo.itemDetail.itemPicb !== null) {
          var obj2 = {
            url: that.editCargo.itemDetail.itemPicb
          }
          that.fileList2.push(obj2)
        }
        if (that.editCargo.itemDetail.itemPicc !== null) {
          var obj3 = {
            url: that.editCargo.itemDetail.itemPicc
          }
          that.fileList2.push(obj3)
        }
        if (that.editCargo.itemDetail.itemPicd !== null) {
          var obj4 = {
            url: that.editCargo.itemDetail.itemPicd
          }
          that.fileList2.push(obj4)
        }
        if (that.editCargo.itemDetail.itemPice !== null) {
          var obj5 = {
            url: that.editCargo.itemDetail.itemPice
          }
          that.fileList2.push(obj5)
        }
        that.thirdForm.video = that.editCargo.itemDetail.video
        that.state = 1
        // 获取七牛云token
        global.axiosGetReq('/file/getUpToken').then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            that.qiNiuToken = {
              token: res.data.msg
            }
            console.log(that.qiNiuToken.token)
          }
        })
        that.queryHandler();
      } else {
        // 获取七牛云token
        global.axiosGetReq('/file/getUpToken').then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            that.qiNiuToken = {
              token: res.data.msg
            }
            console.log(that.qiNiuToken.token)
          }
        })
        that.queryHandler();
      }
    },
    mounted: function() {
      var that = this;
      //商品详情
      that.quill1 = new Quill('#editor1', {
        modules: {
        toolbar: '#toolbar1'
      },
        placeholder: '',
        theme: 'snow',
        // imageHandler: that.imageHandler
      });
      //图片说明
      that.quill2 = new Quill('#editor2', {
        modules: {
        toolbar: '#toolbar2'
      },
        placeholder: '',
        theme: 'snow',
        // imageHandler: that.imageHandler
      });
      if (that.editCargo !== null) {
        that.quill1.clipboard.dangerouslyPasteHTML(that.editCargo.itemDetail.itemDesc);
        that.quill2.clipboard.dangerouslyPasteHTML(that.editCargo.itemDetail.itemUse);
      } else {
        console.log(that.editCargo,'opop')
      }
    },
    methods: {
      // 插入图片至富文本框
      insertImg() {
        var that = this;
        var insert = {
          image: that.imageUrl,
        }
        // var delta = that.quill1.getContents();
        // delta.push(insert);
        // console.log(delta,'ppp')
        //var i = that.quill1.getContents().ops.length;
        // console.log(i,'333')
        if (that.fwb == 0) {
          that.quill1.insertEmbed(0, 'image', that.imageUrl);
        } else {
          that.quill2.insertEmbed(0, 'image', that.imageUrl);
        }
        that.dialogVisible = false;
      },
      uploaImage: function() {
         var that = this;
         that.imageUrl = '';
         that.fwb = 0,
         that.dialogVisible = true;
      },
      uploaImage1: function() {
         var that = this;
         that.imageUrl = '';
         that.fwb = 1;
         that.dialogVisible = true;
      },
      handleAvatarSuccess(file, fileList) {
        var that = this;
        that.imageUrl = global.qiniuShUrl + file.key;
        console.log(that.imageUrl)
      },
      // 富文本上传图片至七牛云
      // imageHandler: function(image, callback) {
      //   var that = this;
      //   var data = new FormData();
      //   var url = "http://upload-z2.qiniu.com/"; //非华东空间需要根据注意事项 1 修改上传域名
      //   data.append('image', image);
      //   var xhr = new XMLHttpRequest();
      //   xhr.open('POST', url, true);
      //   xhr.setRequestHeader('Authorization', "UpToken " + that.qiNiuToken);
      //   xhr.onreadystatechange = function() {
      //     if (xhr.readyState === 4) {
      //       var response = JSON.parse(xhr.responseText);
      //       if (response.status === 200 && response.success) {
      //         callback(response.data.link);
      //       } else {
      //         var reader = new FileReader();
      //         reader.onload = function(e) {
      //           callback(e.target.result);
      //         };
      //         reader.readAsDataURL(image);
      //       }
      //     }
      //   }
      //   xhr.send(data);
      // },
      // 获取视频链接
      queryHandler() {
        var that = this;
        global.axiosPostReq('/vid/showVid',{}).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            that.options = res.data.data
          }else{
            that.$message.error('查询失败！');
          }
        })
      },
      // 上传图片成功之后
      uploadFile(file, fileList) {
        var that = this;
        var img_src = '';
        img_src = global.qiniuShUrl + file.key
        that.fileList.push(img_src)
      },
      // 删除图片触发的钩子
      handleRemove(file, fileList) {
        var that = this;
        // console.log(fileList,'opop')
        if (fileList.length < that.fileList.length && fileList.length > 0) {
          var img_src = global.qiniuShUrl + file.response.key
        } else if(fileList.length == 0) {
          var img_src = file.url
        }
        var b = that.fileList.filter(function(ele,index,arr) {
            return ele !== img_src;   
        });
        that.fileList = b;
        console.log(that.fileList,'opopoppop')
      },
      // 保存新增商品
      save: function() {
        var that = this;
        if (that.state !== 1) {
          console.log('进入新增商品')
          // that.quill1.insertText(1, 'Hello', 'bold', true);
          that.thirdForm.itemDesc = that.quill1.container.firstChild.innerHTML;
          that.thirdForm.itemUse = that.quill2.container.firstChild.innerHTML;
          // console.log(that.thirdForm.itemDesc,that.thirdForm.itemUse);
          that.thirdForm.itemPica = that.fileList[0];
          that.thirdForm.itemPicb = that.fileList[1];
          that.thirdForm.itemPicc = that.fileList[2];
          that.thirdForm.itemPicd = that.fileList[3];
          that.thirdForm.itemPice = that.fileList[4];
          Object.assign(that.thirdForm,that.message);
          delete that.thirdForm.itemBrand
          delete that.thirdForm.type
          delete that.thirdForm.shopType
          delete that.thirdForm.items
          var itemValueList = JSON.stringify(that.thirdForm.itemValueList)
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://47.93.48.111:8080/api/item/insertItemValue")
          xhr.setRequestHeader("Content-Type", "application/json")
          xhr.send(itemValueList)
          xhr.onreadystatechange = function(){
            // var succeed = JSON.parse(xhr.response.callStatus)
            // console.log(succeed)
            var succeed = JSON.parse(xhr.response)
            if(succeed.callStatus == 'SUCCEED') {
              delete that.thirdForm.itemValueList
              global.axiosPostReq('/item/insert',that.thirdForm).then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  console.log(res,'保存成功！');
                  that.$message('保存成功！');
                  that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
                } else {
                  that.$message.error('网络出错，请稍后再试！');
                }
              })
            } else {
              that.$message.error('保存失败！');
            }
          }
        } else {
          console.log('进入修改商品')
          // that.quill1.insertText(1, 'Hello', 'bold', true);
          that.thirdForm.itemDesc = that.quill1.container.firstChild.innerHTML;
          that.thirdForm.itemUse = that.quill2.container.firstChild.innerHTML;
          console.log(that.thirdForm.itemDesc,that.thirdForm.itemUse);
          that.thirdForm.itemPica = that.fileList[0];
          that.thirdForm.itemPicb = that.fileList[1];
          that.thirdForm.itemPicc = that.fileList[2];
          that.thirdForm.itemPicd = that.fileList[3];
          that.thirdForm.itemPice = that.fileList[4];
          Object.assign(that.thirdForm,that.message);
          delete that.thirdForm.itemBrand
          delete that.thirdForm.type
          delete that.thirdForm.shopType
          delete that.thirdForm.items
          var itemValueList = JSON.stringify(that.thirdForm.itemValueList)
          console.log(that.thirdForm,'sdsdji')
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://47.93.48.111:8080/api/item/updateItemValue")
          xhr.setRequestHeader("Content-Type", "application/json")
          xhr.send(itemValueList)
          xhr.onreadystatechange = function(){
            // var succeed = JSON.parse(xhr.response.callStatus)
            // console.log(succeed)
            var succeed = JSON.parse(xhr.response)
            if(succeed.callStatus == 'SUCCEED') {
              delete that.thirdForm.itemValueList
              global.axiosPostReq('/item/update',that.thirdForm).then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  console.log(res,'修改商品成功！');
                  that.$message('修改商品成功！');
                  window.sessionStorage.removeItem('editCargo')
                  that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
                } else {
                  that.$message.error('网络出错，请稍后再试！');
                }
              })
            } else {
              that.$message.error('保存失败！');
            }
          }
        }
      },
      // 返回上一步
      returnSecond: function() {
        var that = this;
        that.thirdStep = false;
        that.$emit('listenToSecond',that.thirdStep);
      }
    },
    components: {
      // quillEditor,
    }
  }
</script>
<style scoped>
  .firstTitle {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9e9e9;
  }
  .secondTitle,.thirdTitle{
    margin-top: 50px;
    margin-bottom: 15px;
    font-size: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9e9e9;
  }
  .fouthTitle {
    float: left;
    margin-top: 50px;
  }
  .selectTv {
    float: left;
    margin-top: 50px;
  }
  .upload-demo {
  }
  #editor-container {
    height: 375px;
  }
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
    background: #eaeaea;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
