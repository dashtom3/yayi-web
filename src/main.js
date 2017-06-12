// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.filter('frisco', function (value) {
    if(value == 0) {
    	var hh = '待付款'
    	return hh
    }
    if (value == 1) {
    	var aa = '交易关闭'
    	return aa
    }
    if (value == 2) {
    	var ee = '交易成功'
    	return ee
    }
})

Vue.filter('operate', function (value) {
    if(value == 0) {
      var hh = '付款'
      return hh
    }
    if (value == 1) {
      var aa = '无'
      return aa
    }
    if (value == 2) {
      var ee = '评价'
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

//#5DB7E7;#5ed6dc;#04D8DD;红色#D81E06;