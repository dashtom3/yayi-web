<template>
  <div class="secondStep">
    <el-form :inline="true" class="secondStep_box" style="margin-top: 20px;" v-show="secondStep">
      <el-form-item label="商家货号">
        <el-input v-model="secondForm.storeItemId"></el-input>
      </el-form-item>
      <el-form-item label="器械类别">
        <el-input v-model="secondForm.apparatusType"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="secondForm.unit"></el-input>
      </el-form-item>
      <el-form-item label="生产企业">
        <el-input v-model="secondForm.producePompany"></el-input>
      </el-form-item>
      <el-form-item label="注册证有效期／备案日期">
        <el-date-picker format="yyyy-MM-dd" v-model="secondForm.registerDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="产品包装">
        <el-input v-model="secondForm.itemPacking"></el-input>
      </el-form-item>
      <el-form-item label="产品标准">
        <el-input v-model="secondForm.itemLevels"></el-input>
      </el-form-item>
      <el-form-item label="使用范围">
        <el-input v-model="secondForm.itemRange"></el-input>
      </el-form-item>
      <div style="margin-left: 30px;">
        <el-button type="primary" @click="nextToThird()">下一步</el-button>
        <el-button @click="returnFrist()">返回</el-button>
      </div>
    </el-form>
    <thirdStep v-on:listenToSecond="showMsgFromThirdStep" :message="newForm" v-show="thirdStep"></thirdStep>
  </div>
</template>
<script>
  import thirdStep from './thirdStep'
  import util from '../../../common/util'
  export default{
    name: 'secondStep',
    data () {
      return {
        secondStep: true,
        thirdStep: false,
        secondForm: {
          storeItemId: '', //商家货号
          apparatusType: '', //器械类别
          unit: '', //商品单位
          producePompany: '', //生产单位
          registerDate: '', //注册日期
          itemPacking: '', //商品包装
          itemLevels:'', //产品标准
          itemRange: '', //商品使用范围
        },
        ruleForm: {},
        newForm: {},
        message: {},
      }
    },
    components: {
      thirdStep,
    },
    created: function() {
      var that = this;
      that.ruleForm = that.$route.params.ruleForm;
      //console.log(that.ruleForm);
    },
    methods: {
      nextToThird: function() {
        var that = this;
        that.secondForm.registerDate = util.formatDate.format(that.secondForm.registerDate);
        Object.assign(that.newForm,that.secondForm,that.ruleForm);
        that.newForm.apparatusType = parseInt(that.newForm.apparatusType);
        that.secondStep = false;
        that.thirdStep = true;
      },
      returnFrist: function() {
        var that = this;
        that.$router.push({ name: 'addMerchandise', params:{ ruleForm: that.ruleForm }});
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
