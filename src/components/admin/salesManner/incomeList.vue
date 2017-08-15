<template>
  <div>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><b>销售员管理</b></el-breadcrumb-item>
        <el-breadcrumb-item>销售员业绩列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div class="clearfix"></div>
    <div class="tab_box">
      <div class="tab_item" :class="{spe: isActive1}" @click="changeActive1(tab01Text);">已结算</div>
      <div class="tab_item" :class="{spe: isActive2}" @click="changeActive2(tab02Text);">待结算</div>
    </div>
    <!-- 点击导航后要切换的内容 -->
    <transition name="component-fade" mode="out-in">
      <component :is="currentView" keep-alive></component>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import alreadySettled from './alreadySettled'
  import waitSettled from './waitSettled'
  // var tab02 = Vue.extend({
  //   template: '<div>this is 待评价02</div>',
  // });
  export default {
    data () {
      return {
        isActive1: true,
        isActive2: false,
        tab01Text: "tab01",
        tab02Text: "tab02",
        currentView: 'tab01', //默认选中的导航栏
      }
    },
    components: {
      tab01: alreadySettled,
      tab02: waitSettled,
    },
    methods: {
      changeActive1: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = true;
        this.isActive2 = false;
      },
      changeActive2: function(tabText) {
        this.currentView = tabText;
        this.isActive1 = false;
        this.isActive2 = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*-------animation start------*/
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
.spe {
  background-color: #fff;
  border-top: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  color: #005aab !important;
}
.tab_box {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e9e9e9;
  margin-top: 10px;
}
.tab_item {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #97a8be;
  float: left;
}
.tab_item:hover {
  cursor: pointer;
  background-color: #fff;
  transition: all ease 0.5s;
  color: #005aab;
}
</style>
