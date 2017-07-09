<template>
  <div class="thirdStep" v-show="thirdStep">
    <div class="firstTitle">商品图片：(最多5个)</div>
    <el-upload class="upload-demo" :on-remove="handleRemove" :on-success="uploadFile" :data="qiNiuToken" :action="qiNiuUrl" :file-list="fileList2" list-type="picture">
      <el-button size="small" type="primary">添加图片</el-button>
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
      <div id="editor1"></div>
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
        <div id="editor2"></div>
     <!--  <div id="editor" type="text/plain" style="width: 100%; height: 500px;"></div> -->
<!--     <button @click="submits">保存</button>  -->
<!--       <vue-editor id="editor2" v-model="thirdForm.itemUse"></vue-editor> -->
    </div>
    <div class="fouth_box">
      <div class="fouthTitle">视频说明：</div>
        <el-select v-model="thirdForm.video" filterable placeholder="请选择" class="selectTv">
          <el-option v-for="item in options" :key="item.vidRoute" :label="item.vidRoute" :value="item.vidRoute">
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
  // import { VueEditor } from 'vue2-editor'
  // import { quillEditor } from 'vue-quill-editor';
  // require('../../../../node_modules/quill/core/quill')
  import global from '../../global/global' 
  import axios from 'axios'
  //import Quill from 'quill'
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
      }
    },
    created: function() {
      var that = this;
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
    },
    mounted: function() {
      var that = this;
      that.quill1 = new Quill('#editor1', {
        modules: {
        toolbar: '#toolbar1'
      },
        placeholder: '',
        theme: 'snow',
        // imageHandler: that.imageHandler
      });
      that.quill2 = new Quill('#editor2', {
        modules: {
        toolbar: '#toolbar2'
      },
        placeholder: '',
        theme: 'snow',
        // imageHandler: that.imageHandler
      });
    },
    methods: {
      imageHandler(image, callback) {
        var that = this;
        var url = that.qiNiuUrl;
        var token = that.qiNiuToken.token;
        console.log('ppopopopop')
        var data = new FormData();
        data.append('image', image);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader('Authorization', "UpToken " + token);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 200 && response.success) {
              callback(response.data.link);
            } else {
              var reader = new FileReader();
              reader.onload = function(e) {
                callback(e.target.result);
              };
              reader.readAsDataURL(image);
            }
          }
        }
        xhr.send(data);
      },
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
        // console.log(file,fileList)
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
            console.log(that.options,'xs');
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
        var img_src = global.qiniuShUrl + file.response.key;
        // console.log(img_src);
        var b = that.fileList.filter(function(ele,index,arr) {
            //console.log(ele,'3333333');
            return ele !== img_src;   
        });
        that.fileList = b;
      },
      // 保存新增商品
      save: function() {
        var that = this;
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
        var itemValueList = JSON.stringify(that.thirdForm.itemValueList)
        console.log(itemValueList)
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
                console.log(res,'22222');
                that.$message('保存成功！');
                that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
              } else {
                that.$message.error('网络出错，请稍后再试！');
              }
            })
          }
        }

        // var qq = {
        //   apparatusType:2,
        //   isThrow:0,
        //   itemBrandId:3,
        //   itemBrandName:"武汉高登",
        //   itemDesc:"<p>rfgrfrfrfrfr</p>",
        //   itemId: '1707040002',
        //   itemLevels:"12323",
        //   itemName:"123",
        //   itemPacking:"12323",
        //   itemPica:"http://orl5769dk.bkt.clouddn.com/Fjn3NulDVDHq_SX19BC6QOJvwV_r",
        //   itemPicb: "http://orl5769dk.bkt.clouddn.com/Fvc7rLFt0gJaqR080CJ1KYiq3igO",
        //   itemPicc:"http://orl5769dk.bkt.clouddn.com/FrqX_ttOVVOLwz5ee22hgsZ_hrY6",
        //   itemPicd:"http://orl5769dk.bkt.clouddn.com/FrF-erbJV1hYHD-6ACiKUShG4l1j",
        //   itemPice :"http://orl5769dk.bkt.clouddn.com/Fvstw2BuoZh6dk8Px8PxD8LMbMLw",
        //   itemRange:"231232",
        //   itemUse:"<p>frfrfrfrfr</p>",
        //   itemValueList:[{canUse:1,itemPropertyFiveName:"",itemPropertyFiveValue:"",itemPropertyFourName:"",itemPropertyFourValue:"",itemPropertyInfo:"",itemPropertyName:"",itemPropertyNameThree:"",itemPropertyNameTwo:"",itemPropertySixName:"",itemPropertySixValue:"",itemPropertyThreeValue:"",itemPropertyTwoValue:"",itemQb:12,itemSKU:"17070500071",itemSkuPrice:123,itemValueId:"",stockNum:12,tiChen:12}],
        //   oneClassify:"预防护理",
        //   producePompany:"12323",
        //   registerDate:"2017-07-12",
        //   registerId:"123123",
        //   storeItemId:"12323",
        //   threeClassify:"漱口水",
        //   twoClassify:"日常护理",
        //   unit:"21323",
        //   video:"http://orl5769dk.bkt.clouddn.com/FqCsIFokMKOikya4XeF0wCFw0JTg"
        // };
        // var arr = [{canUse:1,itemId:"1707050007",itemPropertyFiveName:"",itemPropertyFiveValue:"",itemPropertyFourName:"",itemPropertyFourValue:"",itemPropertyInfo:"",itemPropertyName:"",itemPropertyNameThree:"",itemPropertyNameTwo:"",itemPropertySixName:"",itemPropertySixValue:"",itemPropertyThreeValue:"",itemPropertyTwoValue:"",itemQb:12,itemSKU:"17070500071",itemSkuPrice:123,itemValueId:"",stockNum:12,tiChen:12}]
        // var itemValueList = JSON.stringify(arr)
        // console.log(itemValueList,'22222');
          // axios({
          //   method: 'post',
          //   url: 'http://192.168.1.103:8081/api/item/insert',
          //   data: qq
          // })
          // .then(function (response) {
          //   console.log(response);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
       // console.log(qq);
        that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
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
