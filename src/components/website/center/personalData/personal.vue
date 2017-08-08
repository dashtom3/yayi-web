<template>
  <div class="personal">
    <div class="head">
      <span :class="{nowTabActive:1==currentTabs}" v-on:click="changeTabs(1)">个人信息</span>
      <span :class="{nowTabActive:2==currentTabs}" v-on:click="changeTabs(2)">资质认证</span>
      <span :class="{nowTabActive:3==currentTabs}" v-on:click="changeTabs(3)">绑定客户代表</span>
      <div style="clear:both"></div>
    </div>
    <personalData v-show="1==currentTabs"></personalData>
    <certification v-bind:state="currentTabs" v-show="2==currentTabs"></certification>
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
        currentTabs: 1
      }
    },
    props: ['salesman'],
    created: function() {
      var that = this
      that.currentTabs = that.salesman;
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
        this.currentTabs = index
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
  background: #005aab;
}
.head .nowTabActive{
  color: white;
  background: #005aab;
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
