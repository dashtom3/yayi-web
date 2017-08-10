<template>
  <div class="secondStep">
    <el-form :inline="true" :model="secondForm" :rules="rules" ref="secondForm" class="secondStep_box" style="margin-top: 20px;" v-show="secondStep">
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
      <el-form-item label="注册证有效期" prop="registerDate">
        <el-date-picker format="yyyy-MM-dd" v-model="registerDate.date1" type="date" placeholder="选择日期" :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备案日期" prop="registerDate">
        <el-date-picker format="yyyy-MM-dd" v-model="registerDate.date2" type="date" placeholder="选择日期" :clearable="false">
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
      <el-form-item label="其他">
        <el-input v-model="secondForm.remark"></el-input>
      </el-form-item>
      <div style="margin-left: 30px;">
        <el-button type="primary" @click="nextToThird('secondForm')">下一步</el-button>
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
          remark: '', //其他
        },
        registerDate:{
          date1: '',
          date2: ''
        },
        ruleForm: {},
        newForm: {},
        message: {},
        rules: {
          // registerDate: [
          //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          // ]
        }
      }
    },
    components: {
      thirdStep,
    },
    created: function() {
      var that = this
      that.editCargo = JSON.parse(window.sessionStorage.getItem('editCargo'))
      if (that.editCargo !== null) {
        that.ruleForm = that.$route.params.ruleForm
        that.ruleForm.isThrow = parseInt(that.ruleForm.isThrow)
        that.secondForm.storeItemId = that.editCargo.itemDetail.storeItemId
        that.secondForm.apparatusType = that.editCargo.itemDetail.apparatusType
        that.secondForm.unit = that.editCargo.itemDetail.unit
        that.secondForm.producePompany = that.editCargo.itemDetail.producePompany
        that.secondForm.itemPacking = that.editCargo.itemDetail.itemPacking
        that.secondForm.itemLevels = that.editCargo.itemDetail.itemLevels
        that.secondForm.itemRange = that.editCargo.itemDetail.itemRange
        that.secondForm.remark = that.editCargo.itemDetail.remark
        var k = that.editCargo.itemDetail.registerDate.split('／')
        that.registerDate.date1 = k[0]
        that.registerDate.date2 = k[1]
        if (that.registerDate.date1 == '暂无') {
          that.registerDate.date1 = ''
        }
        if(that.registerDate.date2 == '暂无') {
          that.registerDate.date2 = ''
        }
      } else {
        that.ruleForm = that.$route.params.ruleForm
        that.ruleForm.isThrow = parseInt(that.ruleForm.isThrow)
      }
    },
    methods: {
      nextToThird: function(formName) {
        var that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            if (that.editCargo !== null) {
              if (that.registerDate.date1 == '') {
                that.registerDate.date1 = '暂无'
              } 
              if(that.registerDate.date2 == '') {
                that.registerDate.date2 = '暂无'
              }
              that.secondForm.date1 = that.registerDate.date1
              that.secondForm.date2 = that.registerDate.date2
              Object.assign(that.newForm,that.secondForm,that.ruleForm)
              that.secondStep = false
              that.thirdStep = true
            } else {
              that.secondForm.date1 = that.registerDate.date1
              that.secondForm.date2 = that.registerDate.date2
              Object.assign(that.newForm,that.secondForm,that.ruleForm)
              that.secondStep = false
              that.thirdStep = true
            }
          } else {
            return false;
          }
        });
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
