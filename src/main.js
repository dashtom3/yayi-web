// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/iconfont.css'
import App from './App'
import router from './router'
// import axios from 'axios'
import Global from './components/global/global'

// import Mock from './mock'
// Mock.init()

Vue.use(ElementUI)
Vue.config.productionTip = false
//设置全局global
Vue.prototype.global = Global

Vue.filter('frisco', function (value) {
    if(value == 0) {
    	var hh = '交易关闭'
    	return hh
    }
    if (value == 1) {
    	var aa = '待付款'
    	return aa
    }
    if (value == 2) {
    	var ee = '待发货'
    	return ee
    }
    if (value == 3) {
    	var ee = '待收货'
    	return ee
    }
    if (value == 4) {
    	var ee = '待评价'
    	return ee
    }
    if (value == 5) {
    	var ee = '确定定单'
    	return ee
    }
    if (value == 6) {
    	var ee = '退货中'
    	return ee
    }
})

Vue.filter('operate', function (value) {
    if(value == 1) {
      var hh = '付款'
      return hh
    }
    // if (value == 1) {
    //   var aa = '无'
    //   return aa
    // }
    if (value == 4) {
      var ee = '评价'
      return ee
    }
    if (value == 3) {
      var ee = '待收货'
      return ee
    }
    // return middleState2
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// Vue.nextTick(function(){
//   console.log("asdas")
// });
//#5DB7E7;#5ed6dc;#04D8DD;红色#D81E06;
