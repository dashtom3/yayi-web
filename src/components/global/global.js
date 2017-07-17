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
  }
}
