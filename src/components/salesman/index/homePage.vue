<template>
  <div class="index_personal_mymoney">
    <div class="personal">
      <span class="headName">个人信息</span>
      <div class="personal_left">
        <div class="userImgWrap">
          <img style="border-radius:50%;width:100%;height:100%;cursor:auto;" :src="imgUrl" alt="头像" v-if="imgUrl">
          <img src="../../../images/center/loadUserImg.png" style="border-radius:50%;width:100%;height:100%;cursor:auto;" alt="头像" v-if="!imgUrl">
        </div>
      </div>
      <div class="personal_right">
        <div class="oneInfor">
          <span>手机号：</span>
          <span>{{phone}}</span>
        </div>
        <div class="oneInfor">
          <span>真实姓名：</span>
          <span>{{trueName}}</span>
        </div>
        <div class="oneInfor">
          <span v-if="this.postalType === '支付宝'">支付宝账户：</span>
          <span v-if="this.postalType === '银行'">银行账户：</span>
          <span>{{accountNumber}}</span>
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
        账户余额：<span>￥{{accountAmt}}</span>
      </div>
      <div class="btnWrap">
        <span v-on:click="cash()">提现</span>
        <span v-on:click="lookDetais()">查看明细</span>
      </div>
    </div>
    <div class="clearFloat"></div>
    <div class="curOrder">本月订单</div>
    <dataTable :orderInfo="orderInfo" :echartData="echartData" v-if="orderInfo.myOrderVoList"></dataTable>
    <paging :childmsg="pageProps" style="text-align:center;margin-top:20px;" @childSay="pageHandler"></paging>
  </div>
</template>

<script>
  import dataTable from './dataTable'
  import global from '../../global/global'
  import paging from '../../website/brandLib/paging0'
  export default {
    data () {
      return {
        pageProps: {
          pageNum: 1,
          totalPage: 1
        },
        dateInfo: {
          year: new Date().getFullYear(),
          month: new Date().getMonth()+1
        },
        phone: '',
        trueName: '',
        accountNumber: '',
        imgUrl: '',
        postalType: '',
        accountAmt: '',
        orderInfo: {},
        personalData: null,
        echartData: []
      }
    },
    components: {
      dataTable,
      paging
    },
    created: function() {
      this.init()
      this.echartPic()
      this.queryInfo()
      this.getMyWallet()
    },
    methods: {
      init(){
        let params = {
          currentPage: this.pageProps.pageNum,
          numberPerPage: 10,
          token: global.getSalesToken()
        }
        global.axiosGetReq('/saleMyOrder/myOrder',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.orderInfo = res.data.data
            this.pageProps.totalPage = res.data.totalPage
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      //获取钱包明细
      getMyWallet(){
        var that = this;
        var obj = {
          token: that.global.getSalesToken(),
          state: 0,
        }
        that.global.axiosPostReq('/myWallet/detail',obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            this.accountAmt = res.data.data.withdrawalsTX;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      queryInfo(){
        let params = {
          phone: global.getSalesUser().phone,
          token: global.getSalesToken(),
        }
        global.axiosGetReq('/saleInfo/query',params).then((res) => {
          if(res.data.callStatus === 'SUCCEED'){
            this.phone = res.data.data.phone
            this.trueName = res.data.data.trueName
            this.accountNumber = res.data.data.accountNumber
            this.postalType = res.data.data.postalType
            this.imgUrl = res.data.data.salePic
          }
        })
      },
      echartPic(){
        let params = {
          year: this.dateInfo.year,
          month: this.dateInfo.month,
          token: global.getSalesToken()
        }
        global.axiosGetReq('/saleMyOrder/chart',params).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            console.log(res.data.data)
            this.echartData = res.data.data
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      pageHandler(data){
        this.pageProps.pageNum = data
        this.init();
      },
      immediateDoIt:function(){
        var that = this;
        that.$emit('msgFromChild','editMyPersData');
      },
      cash:function(){
        var that = this;
        var getMyMoney = {
          isActive: true,
          myMoney: 'getMyMoney',
        }
        that.$emit('msgFromChild',getMyMoney);
      },
      lookDetais:function(){
        var that = this;
        var getMyMoney = {
          isActive: false,
          myMoney: 'getMyMoney',
        }
        that.$emit('msgFromChild',getMyMoney);
      },
    }
  }
</script>

<style scoped>
.index_personal_mymoney{
  width: 1200px;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 40px;
}
.clearFloat{
  clear: both;
}
.userImgWrap{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 0 20px 10px #eee;
  margin: 80px 102px 0 78px;
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
  line-height: 10px;
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
