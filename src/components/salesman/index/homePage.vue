<template>
  <div class="index_personal_mymoney">
    <div class="personal">
      <span class="headName">个人信息</span>
      <div class="personal_left">
        <div class="userImgWrap">
          <label for="file1" v-if="imgIs">
            +<input style="display:none" type="file" name="file1" id="file1">
          </label>
          <img style="border-radius50%;width:100%;height:100%" src="" alt="" v-else>
          <p>更换头像</p>
        </div>

      </div>
      <div class="personal_right">
        <div class="oneInfor">
          <span>手机号：</span>
          <span>134141241</span>
        </div>
        <div class="oneInfor">
          <span>真实姓名：</span>
          <span>134141241</span>
        </div>
        <div class="oneInfor">
          <span>支付宝账户：</span>
          <span>134141241</span>
        </div>
        <div class="btnWrap">
          <span v-on:click="immediateDoIt()">立即完善</span>
        </div>
      </div>
      <div class="clearFloat"></div>
    </div>
    <div class="mymoney">
      <span class="headName">我的钱包</span>
      <div class="userLeaveMoney">
        账户余额：<span>￥7000</span>
      </div>
      <div class="btnWrap">
        <span v-on:click="cash()">提现</span>
        <span v-on:click="lookDetais()">查看明细</span>
      </div>
    </div>
    <div class="clearFloat"></div>
    <div class="curOrder">本月订单</div>
    <dataTable></dataTable>
  </div>
</template>

<script>
  import dataTable from './dataTable'
  export default {
    name: 'aa',
    data () {
      return {
        imgIs:true
      }
    },
    components: {
      // salesHead,
      dataTable
    },
    created: function() {
      console.log("aaa")
    },
    methods: {
      immediateDoIt:function(){
        var that = this;
        that.$emit('msgFromChild', 'editMyPersData' );
      },
      cash:function(){
        var that = this;
        that.$emit('msgFromChild', 'getMyMoney' );
      },
      lookDetais:function(){
        var that = this;
        that.$emit('msgFromChild', 'getMyMoney' );
      },
    }
  }
</script>

<style scoped>
.index_personal_mymoney{
  width: 1200px;

  margin: auto;
  margin-top: 80px;
  margin-bottom: 40px;
}
.clearFloat{
  clear: both;
}
.userImgWrap{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 0 20px 10px #eeeeee;
  margin: 80px 102px 30px 78px;
  text-align: center;
  line-height: 90px;
  cursor: pointer;
}
.userImgWrap label{
  font-size: 65px;
  color: #eeeeee;
  cursor: pointer;
  font-weight: 300;
}
.userImgWrap p{
  line-height: 50px;
}
.personal_right{
  /*float: right;*/
  margin-left: 270px;
}
.personal_right .btnWrap{
  text-align: center;
}
.personal_left{
  width: 270px;
  float: left;
  text-align: left;
  /*display: inline-block;*/
}
.personal_right .oneInfor{
  margin-bottom: 38px;
}
.personal_right .oneInfor:nth-child(1){
  margin-top: 74px;
}
.personal_right .oneInfo:last-child{
  margin-bottom: 34px;
}
.personal_right .oneInfor span:nth-child(1){
  font-size: 15px;
  font-weight: 600;
}
.index_personal_mymoney .personal{
  width: 568px;
  height: 298px;
  border: 1px solid #eeeeee;
  position: relative;
  float: left;
}
.index_personal_mymoney .mymoney{
  width: 568px;
  height: 298px;
  border: 1px solid #eeeeee;
  position: relative;
  float: right;
}
.userLeaveMoney{
  text-align: center;
  margin-top: 100px;
  margin-bottom: 70px;
}
.userLeaveMoney span{
  color: #d81e06;
  font-size: 16px;
  font-weight: 600;

}
.btnWrap span{
  line-height: 40px;
  width: 100px;
  text-align: center;
  color: white;
  background: #5db7e8;
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  }
  .btnWrap span:hover{
    background: #57a5cf;
  }
.index_personal_mymoney .headName{
  line-height: 40px;
  width: 160px;
  background-color: #eeeeee;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.mymoney .btnWrap span:nth-child(1){
  margin-left: 144px;
  margin-right: 70px;
}
.curOrder{
  height: 30px;
  line-height: 30px;
  margin-top: 30px;
  padding-left: 24px;
  border-bottom: 1px dotted #ccc;
  background: url(../../../images/salesman/arrow.png) 0 8px no-repeat;
}
</style>
