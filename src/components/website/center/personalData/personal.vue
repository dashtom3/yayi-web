<template>
  <div class="personal">
    <div class="head">
      <span :class="{nowTabActive:1==currentTabs}" v-on:click="changeTabs(1)">个人信息</span>
      <span :class="{nowTabActive:2==currentTabs}" v-on:click="changeTabs(2)">资质认证</span>
      <span :class="{nowTabActive:3==currentTabs}" v-on:click="changeTabs(3)">绑定销售员</span>
      <div style="clear:both" class="">

      </div>
    </div>
    <personalData :userData="personInfo" v-show="1==currentTabs"></personalData>
    <certification :userData="personInfo" v-bind:state="currentTabs" v-show="2==currentTabs"></certification>
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
        currentTabs:1,
        personInfo: {}
      }
    },
    created(){
      this.init();
    },
    components:{
      personalData,
      certification,
      bindSale
    },
    methods:{
      changeTabs:function(index){
        this.currentTabs = index;
      },
      init(){
        var obj = {
          phone: global.getUser().phone,
          token: global.getToken()
        }
        //查询个人信息
        global.axiosGetReq('/userPersonalInfo/detail', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') { 
            this.personInfo = res.data.data;
            this.personInfo.birthday = util.formatDate.format(new Date(res.data.data.birthday));
            this.personInfo.sex = res.data.data.sex && res.data.data.sex.toString();
            this.personInfo.type = res.data.data.sex && res.data.data.type.toString();
            this.personInfo.part = res.data.data.part && res.data.data.part.split(",");
          }else{
            this.$message.error('个人信息查询失败！');
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
