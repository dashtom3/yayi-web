import axios from 'axios'
export default {
  baseUrl: 'http://47.93.48.111:8080/api',
  // baseUrl: 'http://192.168.1.103:8081/api',
  qiNiuUrl: 'http://upload-z2.qiniu.com/',
  qiniuShUrl: 'http://orl5769dk.bkt.clouddn.com/',
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        if (url) {
          obj.$router.push(url)
        }
      }
    })
  },
  error (obj, msg, url) {
    obj.$message({
      message: msg,
      duration: '1000',
      type: 'error',
      onClose: function () {
        if (url) {
          obj.$router.push(url)
        }
      }
    })
  },
  extendCopy(p) {
　　　　var c = {};
　　　　for (var i in p) {
　　　　　　c[i] = p[i];
　　　　}
　　　　return c;
　},
  copyArr(arr) {
      let res = []
      for (let i = 0; i < arr.length; i++) {
       res.push(arr[i])
      }
      return res
  },
  postHttpData (data) {
    var formData = new FormData()
    for (let i in data) {
      if (data[i] != null) {
        formData.append(i, data[i])
      }
    }
    return formData
  },
  getHttpData (data) {
    var formData = ''
    for (let i in data) {
      if (data[i] != null) {
        formData = formData + '&' + i + '=' + data[i]
      }
    }
    return formData
  },
  setToken (token) {
    localStorage.setItem('adverToken', token)
  },
  setSalesToken (token) {
    localStorage.setItem('salesToken', token)
  },
  // yayiAbcToken
  removeMsg () {
    localStorage.removeItem('adverToken')
    localStorage.removeItem('adverUser')
  },
  getToken () {
    return localStorage.getItem('adverToken')
  },
  setUser (data) {
    localStorage.setItem('adverUser', JSON.stringify(data))
  },
  getUser () {
    return JSON.parse(localStorage.getItem('adverUser'))
  },
  // 创客系统token
  getSalesToken () {
    return localStorage.getItem('salesToken')
  },
  removeSalesMsg () {
    localStorage.removeItem('salesToken')
    localStorage.removeItem('salesUser')
  },
  setSalesUser (data) {
    localStorage.setItem('salesUser', JSON.stringify(data))
  },
  getSalesUser () {
    return JSON.parse(localStorage.getItem('salesUser'))
  },
  // 后台系统token
  getAdminToken () {
    return sessionStorage.getItem('adminToken')
  },
  removeAdminMsg () {
    sessionStorage.removeItem('adminToken')
  },
  setAdminToken (data) {
    sessionStorage.setItem('adminToken',data)
  },
  // 历史记录存储
  getHistory () {
    return localStorage.getItem('userHistory')
  },
  setHistory (data) {
    localStorage.setItem('userHistory', JSON.stringify(data))
  },
  removeHistory () {
    localStorage.removeItem('userHistory')
  },
  axiosPostReq (url, data) {
    //axios.defaults.headers['token'] = this.getToken()
    return axios.post(this.baseUrl + url, this.postHttpData(data))
  },
  axiosPostReq2 (url, data) {
    //axios.defaults.headers['token'] = this.getToken()
    return axios.post(this.baseUrl + url, this.postHttpData(data))
  },
  axiosGetReq (url, getParamsObj) {
    return axios.get(this.baseUrl + url ,{params:getParamsObj})
  },
  axiosGetQiNiuReq (url, getParamsObj) {
    return axios.get(this.qiniuShUrl + url ,{params:getParamsObj})
  },
  getQiNiuToken () {
    return this.axiosGetQiNiuReq('qiniu/getQiNiuToken')
  },
  //买商品给钱币规则
  // 道邦
      // 该商品购买金额<300,赠送钱币数量=档次购买金额*3%
      // 300<=该商品购买金额<600,赠送钱币数量=档次购买金额*5%
      // 600<=该商品购买金额<1200,赠送钱币数量=档次购买金额*8%
      // 1200<=该商品购买金额<2500,赠送钱币数量=档次购买金额*12%
      // 该商品购买金额>=2500,赠送钱币数量=档次购买金额*15%
  // 其他品牌
      // 耗材类
          // 该商品购买金额<500,赠送钱币数量=档次购买金额*3%
          // 500<=该商品购买金额<1000,赠送钱币数量=档次购买金额*5%
          // 1000<=该商品购买金额<3000,赠送钱币数量=档次购买金额*8%
          // 该商品购买金额>=3000,赠送钱币数量=档次购买金额*12%
      // 工具设备类
          // 该商品1件，赠送钱币数量=档次购买金额*5%
          // 该商品>=2件，赠送钱币数量=档次购买金额*10%
  goodToMoney:function(goodList){
    // goodList 本次购买商品的；列表
    var finalyMoney = 0;//计算后返回的钱币数量
    for(let i in goodList){
      var thisGoodAllMoney = goodList[i].price * 100 * goodList[i].num / 100;
      var rate;
      if(goodList[i].goodBrandName=="上海道邦"){
        if(thisGoodAllMoney<300){
          rate = 3;
        }else if(300<=thisGoodAllMoney<600){
          rate = 5;
        }else if(600<=thisGoodAllMoney<1200){
          rate = 8;
        }else if(1200<=thisGoodAllMoney<2500){
          rate = 12;
        }else if(2500<=thisGoodAllMoney){
          rate = 15;
        }
      }else{
        if(goodList[i].goodSort=="耗材类"){
          if(thisGoodAllMoney<500){
            rate = 3;
          }else if(500<=thisGoodAllMoney<1000){
            rate = 5;
          }else if(1000<=thisGoodAllMoney<3000){
            rate = 8;
          }else if(3000<=thisGoodAllMoney){
            rate = 12;
          }
        }else if(goodList[i].goodSort=="工具设备类"){
          if(goodList[i].num==1){
            rate = 5;
          }else if(goodList[i].num>=2){
            rate = 10;
          }
        }
      }
      finalyMoney += thisGoodAllMoney * 100 * rate / 10000;
    }
    return Math.round(finalyMoney);
  },
  // RMB兑换钱币规则
  moneyToMoney:function(money){
    // money--需要兑换的人民币数量
    // 钱币兑换比率
// (1) 1000元<=单次购买金额<2000元，兑换钱币数量=当次实际兑换金额*110%；
// (2) 2000元<=单次购买金额<5000元，兑换钱币数量=当次实际兑换金额*115%；
// (3) 5000元<=单次购买金额<10000元，兑换钱币数量=当次实际兑换金额*120%；
// (4) 单次购买金额>10000元，兑换钱币数量=当次实际兑换金额*125%；
    if(money){
      var finalyMoney;
      var rate;
      if(money<1000){
        rate = 100;
      }else if(1000<=money&&money<2000){
        rate = 110;
      }else if(2000<=money&&money<5000){
        rate = 115;
      }else if(5000<=money&&money<10000){
        rate = 120;
      }else if(10000<=money){
        rate = 125;
      }
      finalyMoney = money * rate / 100;
      return Math.round(finalyMoney);
    }
  },
}
