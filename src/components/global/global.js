import axios from 'axios'
export default {
  baseUrl: 'http://47.93.48.111:8080/api',
  qiNiuUrl: 'http://up-z0.qiniu.com/',
  qiniuShUrl: 'http://oqhy88nu6.bkt.clouddn.com/',
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
  axiosPostReq (url, data) {
    //axios.defaults.headers['token'] = this.getToken()
    return axios.post(this.baseUrl + url, this.postHttpData(data))
  },
  axiosGetReq (url, getParamsObj) {
    return axios.get(this.baseUrl + url ,{params:getParamsObj})
  },
  getQiNiuToken () {
    return this.axiosGetReq('qiniu/getQiNiuToken')
  }
}
