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
      <vue-editor id="editor1" v-model="thirdForm.itemDesc"></vue-editor>
    </div>
    <div class="third_box">
      <div class="thirdTitle">图片说明：</div>
      <vue-editor id="editor2" v-model="thirdForm.itemUse"></vue-editor>
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
  import { VueEditor } from 'vue2-editor'
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
    methods: {
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
            console.log(ele,'3333333');
            return ele !== img_src;   
        });
        that.fileList = b;
      },
      // 保存新增商品
      save: function() {
        var that = this;
        that.thirdForm.itemPica = that.fileList[0];
        that.thirdForm.itemPicb = that.fileList[1];
        that.thirdForm.itemPicc = that.fileList[2];
        that.thirdForm.itemPicd = that.fileList[3];
        that.thirdForm.itemPice = that.fileList[4];
        Object.assign(that.thirdForm,that.message);
        // console.log(that.message,'third');
        delete that.thirdForm.itemBrand
        delete that.thirdForm.type
        console.log(that.thirdForm,'333')
          axios({
            method: 'post',
            url: 'http://192.168.1.103:8081/api/item/insert',
            data: that.thirdForm
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        // global.axiosPostReq('/item/insert',that.thirdForm).then((res) => {
        //   console.log(res,'22222');
        //   if (res.data.callStatus === 'SUCCEED') {
        //     console.log('333');
        //   } else {
        //     that.$message.error('网络出错，请稍后再试！');
        //   }
        // })
        // that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
      },
      // 返回上一步
      returnSecond: function(){
        var that = this;
        that.thirdStep = false;
        that.$emit('listenToSecond',that.thirdStep);
      }
    },
    components: {
      VueEditor,
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
</style>
