<template>
  <div class="secondStep">
    <el-form :inline="true" class="secondStep_box" style="margin-top: 20px;" v-show="secondStep">
      <el-form-item label="商家货号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="器械类别">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="生产企业">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="注册证有效期／备案日期">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="产品包装">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="产品标准">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="使用范围">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="其他">
        <el-input></el-input>
      </el-form-item>
      <div style="margin-left: 30px;">
        <el-button type="primary" @click="nextToThird()">下一步</el-button>
        <el-button @click="returnFrist()">返回</el-button>
      </div>
    </el-form>
    <thirdStep v-on:listenToSecond="showMsgFromThirdStep" v-show="thirdStep"></thirdStep>
  </div>
</template>
<script>
  import thirdStep from './thirdStep'
  export default{
    name: 'secondStep',
    data () {
      return {
        secondStep: true,
        thirdStep: false,
      }
    },
    components: {
      thirdStep,
    },
    methods: {
      nextToThird: function() {
        var that = this;
        that.secondStep = false;
        that.thirdStep = true;
      },
      returnFrist: function() {
        var that = this;
        that.$router.push({ name: '商品信息管理', params:{ list: false, addMerchandise: true}});
      },
      showMsgFromThirdStep: function(data) {
        var that = this;
        that.thirdStep = data;
        that.secondStep = true;
      }
    }
  }
</script>
<style scoped>
</style>
