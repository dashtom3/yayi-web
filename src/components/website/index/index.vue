<template>
  <div class="index">
<!--     <loading></loading> -->
    <backToTop></backToTop>
    <publicHeader :msgFromIndex="reLogData"></publicHeader>
    <classify :brandListData="brandList"></classify>
    <carousel></carousel>
    <preventive></preventive>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from './publicHeader'
  import publicFooter from './publicFooter'
  import classify from './classify'
  import carousel from './carousel'
  import preventive from './preventive'
  import backToTop from './backToTop'
  // import loading from '../loading'
  export default {
    name: 'index',
    data () {
      return {
        brandList:[],
        reLogData: '',
      }
    },
    components: {
      publicHeader,
      classify,
      carousel,
      preventive,
      publicFooter,
      backToTop,
      // loading,
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        //   https://open.weixin.qq.com/connect/qrconnect?appid=wxd342cb43ba1b1e6f&redirect_uri=http%3a%2f%2fwww.yayiabc.com&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect
        // var myurl = window.location.href;
        // let code = myurl.substring(34,66)
        // if (code !== '') {
        //   console.log(myurl.substring(34,66),'90909')
        //   var obj = {
        //     code: code,
        //   }
        //   console.log(obj,'oooooo')
        //   that.global.axiosPostReq('/wxLogin/bandUser',obj).then((res) => {
        //     if (res.data.callStatus === 'SUCCEED') {
        //       console.log(res.data,'succeed')
        //     } else if (res.data.callStatus === 'FAILED') {
        //       console.log(res.data,'failed')
        //     }
        //   })
        // } else {
        //   console.log('wu')
        // }
      })
    },
    created: function() {
      var that = this;
      if (that.$route.params.data == 'RE_LOGIN') {
        that.reLogData = 'RE_LOGIN'
        that.$message.error('登录过期，请重新登录！')
        return false
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
