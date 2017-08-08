<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }

  .clearfix {
    clear: both;
  }

  a {
    text-decoration: none;
    color: #83868E;
  }

  ul {
    list-style-type: none;
  }

  button {
    outline: none;
    border: none;
    list-style-type:none;
  }
  /*过渡动画开始*/
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }
  .shake-enter-active {
    animation: shake .5s;
  }
  .shake-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
  }
  @-webkit-keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  @keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
  }
  /*过渡动画结束*/
  .img_box_change {
    width: 152px;
    margin: 0 auto;
  }
  .img_box_change:hover{
    cursor: pointer;
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
  .publicHover {

  }
  .publicHover:hover {
    cursor: pointer;
    color: #005aab;
    transition: all ease 0.5s;
  }
/*牙医ABC 深蓝#005aab; hover浅蓝#329af0;#04D8DD;红色#D81E06;*/
</style>
