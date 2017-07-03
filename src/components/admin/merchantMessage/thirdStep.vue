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
      <vue-editor id="editor1" v-model="thirdForm.content1"></vue-editor>
    </div>
    <div class="third_box">
      <div class="thirdTitle">图片说明：</div>
      <vue-editor id="editor2" v-model="thirdForm.content2"></vue-editor>
    </div>
    <div class="fouth_box">
      <div class="fouthTitle">视频说明：</div>
        <el-select v-model="thirdForm.value8" filterable placeholder="请选择" class="selectTv">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
          content1: '',
          content2: '',
          value8: '',
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        thirdStep: true,
        qiNiuToken: null,
        qiNiuUrl: global.qiNiuUrl,
      }
    },
    created: function() {
      var that = this;
      global.axiosGetReq('/file/getUpToken', null).then((res) => {
        if (res.data.callStatus === 'SUCCEED') { 
          that.qiNiuToken = {
            token: res.data.msg
          }
        }
      })
    },
    methods: {
      // 上传图片成功之后
      uploadFile(file, fileList) {
        var that = this;
        var img_src = '';
        img_src = global.qiniuShUrl + file.key
        that.fileList.push(img_src)
        // that.thirdForm.itemPica
        // this.advUrl = global.qiniuShUrl + file.response.key
        // this.img_src = global.qiniuShUrl + file.response.key
        // this.fileList = [];
        // this.fileList.push({
        //   name: '',
        //   url: this.img_src
        // })
      },
      // 删除图片触发的钩子
      handleRemove(file, fileList) {
        console.log(file, fileList);
        var img_src = '';
        img_src = global.qiniuShUrl + file.key
        
      },
      save: function() {
        var that = this;
        //console.log(that.message,'third');
        console.log(that.fileList,'333')
        // that.$router.push({ name: '商品信息管理', params:{ list: true, addMerchandise: false}});
      },
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
