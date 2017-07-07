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
<!--         <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor> -->
      <div id="editor"></div>
<!--       <vue-editor id="editor1" v-model="thirdForm.itemDesc"></vue-editor> -->
    </div>
    <div class="third_box">
      <div class="thirdTitle">图片说明：</div>
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
  </div>
</template>
<script>
  // import { VueEditor } from 'vue2-editor'
  // import { quillEditor } from 'vue-quill-editor';
  // require('../../../../node_modules/quill/core/quill')
  import global from '../../global/global' 
  import axios from 'axios'
  //import Quill from 'quill'
  // var quill = new Quill('#editor-container', {
  //   modules: {
  //     toolbar: [
  //       [{ header: [1, 2, false] }],
  //       ['bold', 'italic', 'underline'],
  //       ['image', 'code-block']
  //     ]
  //   },
  //   placeholder: 'Compose an epic...',
  //   theme: 'snow'  // or 'bubble'
  // });
  // var editor = new Quill('#editor', options);
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
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
      }
    },
    created: function() {
      var that = this;
      // 获取七牛云token
      global.axiosGetReq('/file/getUpToken', null).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          that.qiNiuToken = {
            token: res.data.msg
          }
        }
      })
      that.queryHandler();
    },
    mounted: function() {
      var that = this;
      // var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
      function imageHandler(image, callback) {
        var that = this;
        var data = new FormData();
        var url = "http://upload-z2.qiniu.com/"; //非华东空间需要根据注意事项 1 修改上传域名
        data.append('image', image);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', "UpToken " + that.qiNiuToken);
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
      }
      var quill = new Quill('#editor', {
        modules: {
          toolbar: [
            'image'
          ]
        },
        placeholder: 'Insert an image...',
        theme: 'snow',
        imageHandler: imageHandler
      });
    },
    methods: {
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
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        var arr = that.thirdForm.itemDesc.match(imgReg);
        var src =[]
        for (var i = 0; i < arr.length; i++) {
         src.push(arr[i].match(srcReg));
         //获取图片地址
        //  if(src[1]){
        //     console.log('已匹配的图片地址'+(i+1)+'：'+src[1]);
        //  }
        //  //当然你也可以替换src属性
        //  if (src[0]) {
        //   var t = src[0].replace(/src/i, "href");
        //   //alert(t);
        //  }
        }
        //console.log(src);

        for (var i = 0; i <  src.length; i++) {
          // var formData = new FormData()
          // formData.append('pic',src[i][1].split('base64,')[1])
          var pic = src[i][1].replace(/^.*?,/, '');
          // var pic = .split('base64,')[1]
          console.log(pic);
          var url = "http://upload-z2.qiniu.com/"; //非华东空间需要根据注意事项 1 修改上传域名
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange=function(){
            console.log(xhr,'22')
          }
          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-Type", "application/octet-stream");
          xhr.setRequestHeader("Authorization", "UpToken " + that.qiNiuToken);
          xhr.send(pic); 
        }
        //console.log(that.thirdForm.itemDesc,that.thirdForm.itemUse);
        // that.thirdForm.itemPica = that.fileList[0];
        // that.thirdForm.itemPicb = that.fileList[1];
        // that.thirdForm.itemPicc = that.fileList[2];
        // that.thirdForm.itemPicd = that.fileList[3];
        // that.thirdForm.itemPice = that.fileList[4];
        // Object.assign(that.thirdForm,that.message);
        // delete that.thirdForm.itemBrand
        // delete that.thirdForm.type
        // var itemValueList = JSON.stringify(that.thirdForm.itemValueList)
        // console.log(itemValueList)
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://47.93.48.111:8080/api/item/insertItemValue")
        // xhr.setRequestHeader("Content-Type", "application/json")
        // xhr.send(itemValueList)
        // xhr.onreadystatechange = function(){
        //   // var succeed = JSON.parse(xhr.response.callStatus)
        //   // console.log(succeed)
        //   var succeed = JSON.parse(xhr.response)
        //   if(succeed.callStatus == 'SUCCEED') {
        //     delete that.thirdForm.itemValueList
        //     global.axiosPostReq('/item/insert',that.thirdForm).then((res) => {
        //       if (res.data.callStatus === 'SUCCEED') {
        //         console.log(res,'22222');
        //         that.$message('保存成功！');
        //         that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
        //       } else {
        //         that.$message.error('网络出错，请稍后再试！');
        //       }
        //     })
        //   }
        // }

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
        // that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
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

</style>
