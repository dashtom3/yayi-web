<template>
  <div class="personal">
    <div class="head">
      <span :class="{nowTabActive:1==currentTabs}" v-on:click="changeTabs(1)">个人信息</span>
      <span :class="{nowTabActive:2==currentTabs}" v-on:click="changeTabs(2)">资质认证</span>
      <span :class="{nowTabActive:3==currentTabs}" v-on:click="changeTabs(3)">绑定销售员</span>
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
  export default {
    name: 'personal',
    data () {
      return {
        currentTabs:1
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
