<template>
  <div class="salesHead">
    <div class="headerFirst">
      <div class="log right">
        <span class="alreadyLog" @click="goToMy">你好，{{username}}</span><span class="logOut" @click="logOut">退出</span>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'salesHead',
    data () {
      return {
        username: ''
      }
    },
    components: {

    },
    created: function() {
      var that = this;
      that.username = that.global.getSalesUser().phone
    },
    methods: {
      // 登出
      logOut: function() {
        var that = this;
        var obj = {
          token: that.global.getSalesToken()
        }
        that.global.axiosPostReq('/saleLog/reLogin', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.global.removeSalesMsg()
            that.$message({
              message: '退出成功！',
              type: 'success'
            });
            that.$router.push({ path: '/salesLog'})
          } else {
            that.$message.error('退出失败！');
          }
        })
      },
      //去我的信息
      goToMy: function() {
        var that = this;
        that.$emit('msgFromChild', 'editMyPersData');
      }
    }
  }
</script>

<style scoped>
  input {
    border: 1px solid #e9e9e9;
    outline:medium;
    font-size: 15px;
    padding: 0 7px 0 7px;
  }
  input:focus {
    border: 1px solid #e9e9e9;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .error {
    position: absolute;
    left: 127px;
    font-size: 12px;
    color: #cb1700;
  }
  .salesHead {
    width: 100%;
    height: 28px;
    border-bottom: 1px #eee solid;
    box-shadow: 1px 1px 5px #eee;
/*    margin-bottom: 30px;*/
  }
  .headerFirst {
    width: 1200px;
    height: 28px;
    line-height: 28px;
    margin: 0 auto;
    font-size: 14px;
    color: #000;
    z-index: 1000;
  }
  .log {
    margin-left: 60px;
    position: relative;
  }
  .logOut {
    color: #000;
    font-size: 14px;
    margin-left: 60px;
    float: right;
    transform: translateY(-5%);
    cursor: pointer;
  }
  .alreadyLog {
    cursor: pointer;
  }
  .logOut:hover, .alreadyLog:hover{
    color: #005aab;
    transition: all ease 0.5s;
  }
</style>
