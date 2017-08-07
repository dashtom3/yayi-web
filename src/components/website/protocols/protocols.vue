<template>
  <div class="container">
    <publicHeader></publicHeader>
    <backToTop></backToTop>
    <!--中间-->
    <div id="main" class="clearfix">
      <!--左侧导航-->
      <aside class="fl">
        <!--菜单展开时的显示情况-->
        <el-menu v-show="!collapsed" :default-active="isDefault" @open="handleOpen" @close="handleClose" router>
          <template v-for="(item,index) in $router.options.routes" v-if="item.protocolShow">
            <el-submenu v-if="!item.leaf" :index="index+''" :class="{}">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.protocolShow">
                {{term.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" class="el-submenu__title">
              {{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>

        <!--菜单折叠后的显示情况-->
        <ul v-show="collapsed" class="el-menu collapsed" ref="menuCollapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="item.protocolShow">
            <li v-if="!item.leaf" :index="index+''" style="position: relative;">
              <div class="el-submenu__title" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"></div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="term in item.children" :key="term.path" v-if="term.protocolShow" class="el-menu-item" :class="$route.path==term.path?'is-active':''"
                    @click="$router.push(term.path)">{{term.name}}</li>
              </ul>
            </li>
            <li v-else-if="item.leaf&&item.children&&item.children.length" class="el-menu-item el-submenu__title" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
            </li>
          </template>
        </ul>

      </aside>

      <!--右侧内容区-->
      <section class="content-container fl" style="width:1020px;">
        <div class="grid-content bg-purple-light">
          <el-col class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import Vue from 'vue'
  import publicHeader from '../index/publicHeader'
  import publicFooter from '../index/publicFooter'
  import backToTop from '../index/backToTop'

   export default {
    data() {
      return {
        collapsed: false,
        isDefault: '',
      }
    },
    created(){
      this.isDefault = this.$router.currentRoute.path
      this.backToTop()
    },
    watch: {
      '$route' (to, from) {
        this.isDefault = this.$router.currentRoute.path
        this.backToTop()
      }
    },
    components: {
      publicHeader,
      publicFooter,
      backToTop
    },
    methods: {
      //回到顶部
      backToTop: function() {
        var that = this;
        var timer = null;
        var isTop = true;
        // 滚动条滚动时出发
        window.onscroll = function() {
          if (!isTop) {
            clearInterval(timer);
          }
          isTop = false;
        }
        timer = setInterval(function(){
          var osTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          isTop = true;
          if (osTop == 0) {
            clearInterval(timer);
          }
        },30);
      },
      showMenu(i, status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
    }
  }
</script>

<style>
  #main{
    width: 1200px;
    margin: 0 auto;
  }
  #main .fl{
    float: left;
  }
  #main .el-menu{
    width: 180px;
    line-height: 40px;
  }
  #main .el-submenu{
    border-bottom: 1px solid #fff;
  }
  #main .el-menu-item, #main .el-submenu__title {
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #3d76b3;
  }
  #main .el-submenu .el-menu-item {
    background-color: #3d76b3;
  }
  #main .el-submenu .el-submenu__title:hover, #main .el-menu-item:hover{
    background-color: #5db7e8;
  }
  #main .el-submenu .el-menu-item.is-active, #main .el-menu-item.is-active
  .el-submenu .el-menu-item.is-active:hover, #main .el-menu-item.is-active:hover {
    background-color: #7dc5ed;
    color: #fff;
  }
  #main .is-active, #main .is-opened{
    background-color: #5db7e8;
    color: #fff;
  }
  .fr{
    float: right;
  }
  .clearfix{
    zoom: 1;
  }
  .clearfix:after{
    content: "";
    clear: both;
    display: block;
  }
  #main aside{
    float: left;
  }
  #main section{
    min-height: 600px;
    float: left;
  }
  .text-wrap{
    padding: 0 30px 20px 30px;
  }
  .text-wrap h3{
    margin-bottom: 10px;
  }
  .text-wrap h4{
    margin: 6px 0;
  }
  .text-wrap p{
    line-height: 26px;
  }
  .about-ABC p{
    text-indent: 2rem;
  }
  /*.content-ul-1 ul, .content-ul-1 p{
    padding-left: 14px;
  }*/
  .content-ul-1 ul, .content-ul-2 p{
    padding-left: 14px;
  }
  .content-ul-2 li{
    /*height: 26px;*/
    line-height: 26px;
  }
  .company-pos{
    margin: 30px 0;
  }
  .content-ul-1 img{
    width: 600px;
    margin: 30px 0 0 150px;
  }
  .refund_tbs {
    width: 100%;
    border-collapse: collapse;/* 边框合并属性  */
    border: none;
    margin: 20px 0;
  }
  .refund_tbs tr{
    width: 100%;
    height: 46px;
    border: 1px solid #ccc;
  }
  .refund_tbs td{
    text-align: center;
    padding: 4px 2px;
    border: 1px solid #ccc;
  }
</style>
