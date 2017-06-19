<template>
  <div class="thirdStep" v-show="thirdStep">
    <div class="firstTitle">商品图片：(最多5个)</div>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList2" list-type="picture">
      <el-button size="small" type="primary">添加图片</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="clearfix"></div>
    <div class="second_box">
      <div class="secondTitle">商品详情：</div>
      <vue-editor v-model="content"></vue-editor>
    </div>
    <div class="third_box">
      <div class="thirdTitle">图片说明：</div>
      <vue-editor v-model="content"></vue-editor>
    </div>
    <div class="fouth_box">
      <div class="fouthTitle">视频说明：</div>
        <el-select v-model="value8" filterable placeholder="请选择" class="selectTv">
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
  export default{
    name: 'thirdStep',
    data() {
      return {
        fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        content: '<h1>Some initial content</h1>',
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
        value8: '',
        thirdStep: true,
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file)
      },
      save: function() {
        console.log('23')
      },
      fanhui: function() {
        var that = this;
        console.log('22')
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
