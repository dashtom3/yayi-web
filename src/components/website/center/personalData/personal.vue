<template>
  <div class="personal">
    <div class="head">
      <span :class="{nowTabActive:1==currentTabs}" v-on:click="changeTabs(1)">个人信息</span>
      <span :class="{nowTabActive:2==currentTabs}" v-on:click="changeTabs(2)">资质认证</span>
      <span :class="{nowTabActive:3==currentTabs}" v-on:click="changeTabs(3)">绑定销售员</span>
      <div style="clear:both"></div>
    </div>
    <div style="height:745px;" v-if="!personInfo.phone"></div>
    <personalData :userData="personInfo" v-show="1==currentTabs" v-if="personInfo.phone"></personalData>
    <certification :userData="personInfo" v-bind:state="currentTabs" v-if="personInfo.phone" v-show="2==currentTabs"></certification>
    <bindSale v-show="3==currentTabs"></bindSale>
  </div>
</template>

<script>
  import personalData from "./personalData"
  import certification from "./certification"
  import bindSale from "./bindSale"
  import global from '../../../global/global'
  import util from '../../../../common/util'
  export default {
    name: 'personal',
    data () {
      return {
        currentTabs: 1,
        personInfo: {}
      }
    },
    props: ['salesman'],
    created: function() {
      var that = this
      that.currentTabs = that.salesman;
      that.init()
      if(that.currentTabs == 3){
        that.changeTabs(that.currentTabs)
      }else{
        that.changeTabs(1)
      }
    },
    mounted: function() {
      var that = this;
      // 用户手机号跳转
      if (that.$route.params.currentView == 'tab04'){
        that.changeTabs(3)
        that.$emit('listenToChildEvent','tab0401')
      } else if(that.$route.params.currentView == 'tab0401') {
        that.$emit('listenToChildEvent','tab0401')
        that.changeTabs(1)
      }
    },
    components:{
      personalData,
      certification,
      bindSale
    },
    methods:{
      changeTabs:function(index){
        this.currentTabs = index;
        if(index == 2){
          this.init()
        }
      },
      init(){
        var obj = {
          phone: global.getUser().phone,
          token: global.getToken()
        }
        //查询个人信息
        global.axiosGetReq('/userPersonalInfo/detail', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.personInfo = res.data.data
            this.personInfo.birthday = res.data.data.birthday && util.formatDate.format(new Date(res.data.data.birthday))
            this.personInfo.sex = res.data.data.sex && res.data.data.sex.toString() || '1'
            this.personInfo.type = res.data.data.type && res.data.data.type.toString()
            this.personInfo.part = res.data.data.part && res.data.data.part.split(",")
          }else{
            this.$message.error('网络出错，请稍后再试！');
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.personal{
  font-size: 14px;
}
.head{
  border-bottom: 1px solid #eeeeee;
}
.head span{
  width: 135px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  float: left;
}
.head span:hover{
  color: white;
  background: #5db7e8;
}
.head .nowTabActive{
  color: white;
  background: #5db7e8;
}
</style>
<style >
.personal form input{
  border-color: #e9e9e9;
}
.personal input:hover{
  border-color: #e9e9e9;
}
.personal input:focus{
  border-color: #e9e9e9;
}
.personal .el-form-item input:focus{
  border-color: #e9e9e9;
}
.personal .el-form-item input:hover{
  border-color: #e9e9e9;
}

</style>
