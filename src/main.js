import Vue from 'vue'
import ElementUI from 'element-ui'
//import { Button, Select, Radio, Checkbox, Input, Cascader, DatePicker, Upload, Rate, Form, Table, Message, MessageBox, Dialog, Carousel, Collapse} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/iconfont.css'
import App from './App'
import router from './router'
// import axios from 'axios'
import Global from './components/global/global'
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}
Vue.use(ElementUI)
// Vue.component(Button.name, Button)
// Vue.component(Select.name, Select)
// Vue.component(Radio.name, Radio)
// Vue.component(Checkbox.name, Checkbox)
// Vue.component(Input.name, Input)
// Vue.component(Cascader.name, Cascader)
// Vue.component(DatePicker.name, DatePicker)
// Vue.component(Upload.name, Upload)
// Vue.component(Rate.name, Rate)
// Vue.component(Form.name, Form)
// Vue.component(Table.name, Table)
// Vue.component(Message.name, Message)
// Vue.component(MessageBox.name, MessageBox)
// Vue.component(Dialog.name, Dialog)
// Vue.component(Carousel.name, Carousel)
// Vue.component(Collapse.name, Collapse)
Vue.config.productionTip = false
//设置全局global
Vue.prototype.global = Global

Vue.filter('frisco', function (value) {
    if(value == 0) {
    	var hh = '交易关闭'
    	return hh
    }
    if (value == 1) {
    	var aa = '等待买家付款'
    	return aa
    }
    if (value == 2) {
    	var ee = '买家已付款'
    	return ee
    }
    if (value == 3) {
    	var ee = '卖家已发货'
    	return ee
    }
    if (value == 4) {
      var ee = "交易成功"
    	return ee
    }
    if (value == 5) {
    	var ee = '买家已付款'
    	return ee
    }
    if (value == 6) {
    	var ee = '退货中'
    	return ee
    }
    if (value == 9) {
      // 9是已评价
    	var ee = '交易成功'
    	return ee
    }
    if (value == 10) {
      // 9是已评价
    	var ee = '退款成功!'
    	return ee
    }
})

Vue.filter('operate', function (value) {
    if(value == 1) {
      var hh = '付款'
      return hh
    }
    if(value == 2) {
      var hh = '付款'
      return false
    }
    if (value == 4) {
      var ee = '评价'
      return ee
    }
    if (value == 3) {
      var ee = '确认收货'
      return ee
    }
    // return middleState2
})

Vue.filter('canUse', function (value) {
    if(value == 1) {
      var hh = '是'
      return hh
    }
    if(value == 0) {
      var hh = '否'
      return hh
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
